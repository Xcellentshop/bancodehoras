"use client";

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '@/lib/types';
import { PoliceOverview } from '@/components/dashboard/police-overview';
import { AdminOverview } from '@/components/dashboard/admin-overview';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser({ ...userDoc.data() as User, uid: currentUser.uid });
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {user?.role === 'admin' ? (
        <AdminOverview user={user} />
      ) : (
        <PoliceOverview user={user} />
      )}
    </div>
  );
}