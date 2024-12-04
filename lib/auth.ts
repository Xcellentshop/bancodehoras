import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  UserCredential 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { User } from './types';

const INITIAL_ADMIN_EMAIL = 'edson.elis@gmail.com';
const INITIAL_ADMIN_PASSWORD = '123456';

// Initialize the first admin user if it doesn't exist
export async function initializeAdminUser() {
  try {
    // Check if admin already exists
    const adminQuery = query(
      collection(db, 'users'),
      where('email', '==', INITIAL_ADMIN_EMAIL),
      where('role', '==', 'admin')
    );
    const adminDocs = await getDocs(adminQuery);

    if (adminDocs.empty) {
      // Create the admin user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        INITIAL_ADMIN_EMAIL,
        INITIAL_ADMIN_PASSWORD
      );

      // Create the admin user document
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: INITIAL_ADMIN_EMAIL,
        role: 'admin',
        createdAt: new Date().toISOString()
      });

      return userCredential.user;
    }
    return null;
  } catch (error: any) {
    console.error('Error initializing admin:', error);
    throw error;
  }
}

export async function loginAdmin(email: string, password: string): Promise<User> {
  try {
    // First, try to initialize admin if it's the initial admin
    if (email === INITIAL_ADMIN_EMAIL) {
      await initializeAdminUser();
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Usuário não encontrado');
    }

    const userData = userDoc.data();
    if (userData?.role !== 'admin') {
      throw new Error('Acesso não autorizado');
    }

    return { 
      ...userData, 
      uid: userCredential.user.uid,
      email: userCredential.user.email || ''
    } as User;
  } catch (error) {
    console.error('Error logging in admin:', error);
    throw error;
  }
}

export async function loginPolice(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Usuário não encontrado');
    }

    const userData = userDoc.data();
    if (userData?.role !== 'police') {
      throw new Error('Acesso não autorizado');
    }

    return { 
      ...userData, 
      uid: userCredential.user.uid,
      email: userCredential.user.email || ''
    } as User;
  } catch (error) {
    console.error('Error logging in police:', error);
    throw error;
  }
}

export async function createPoliceUser(
  email: string, 
  password: string, 
  warName: string, 
  rank: string
): Promise<User> {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Create the user document
    const userData: User = {
      uid: userCredential.user.uid,
      email,
      role: 'police',
      warName,
      rank: rank as any
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);

    return userData;
  } catch (error) {
    console.error('Error creating police user:', error);
    throw error;
  }
}

export async function createAdminUser(
  email: string, 
  password: string
): Promise<User> {
  try {
    // Check if the creator is an admin
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Não autorizado');
    }

    const creatorDoc = await getDoc(doc(db, 'users', currentUser.uid));
    if (!creatorDoc.exists() || creatorDoc.data().role !== 'admin') {
      throw new Error('Apenas administradores podem criar outros administradores');
    }

    // Create the new admin in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Create the admin document
    const userData: User = {
      uid: userCredential.user.uid,
      email,
      role: 'admin'
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);

    return userData;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}