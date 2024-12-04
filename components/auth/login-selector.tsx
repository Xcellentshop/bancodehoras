"use client";

import { useState } from 'react';
import { Shield, User, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoginForm } from './login-form';
import { AdminLoginForm } from './admin-login-form';

export function LoginSelector() {
  const [selectedRole, setSelectedRole] = useState<'police' | 'admin' | null>(null);

  if (selectedRole === 'police') {
    return <LoginForm onBack={() => setSelectedRole(null)} />;
  }

  if (selectedRole === 'admin') {
    return <AdminLoginForm onBack={() => setSelectedRole(null)} />;
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Banco de Horas</CardTitle>
        <CardDescription>Polícia Militar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full h-20 flex flex-col items-center justify-center space-y-2"
          onClick={() => setSelectedRole('police')}
        >
          <User className="h-6 w-6" />
          <span>Policial</span>
        </Button>
        <Button
          variant="outline"
          className="w-full h-20 flex flex-col items-center justify-center space-y-2"
          onClick={() => setSelectedRole('admin')}
        >
          <UserCog className="h-6 w-6" />
          <span>Comandante</span>
        </Button>
      </CardContent>
    </Card>
  );
}