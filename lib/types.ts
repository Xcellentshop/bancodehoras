export type UserRole = 'police' | 'admin';

export type PoliceRank =
  | 'Soldado 2ª Classe'
  | 'Soldado 1ª Classe'
  | 'Cabo'
  | '1º Sargento'
  | '2º Sargento'
  | '3º Sargento'
  | '4º Sargento'
  | '1º Tenente'
  | '2º Tenente'
  | 'Capitão'
  | 'Major'
  | 'Tenente-Coronel'
  | 'Coronel';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  rank?: PoliceRank;
  warName?: string;
}

export interface HourRequest {
  id: string;
  userId: string;
  warName: string;
  rank: PoliceRank;
  bouNumber: string;
  requestedHours: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
}

export interface HourBalance {
  userId: string;
  totalHours: number;
  usedHours: number;
  lastUpdated: Date;
}