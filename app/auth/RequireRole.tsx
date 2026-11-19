import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../services/api';

interface RequireRoleProps {
  roles: Role[];
  children: ReactNode;
}

export function RequireRole({ roles, children }: RequireRoleProps) {
  const { hasRole } = useAuth();
  return hasRole(roles) ? <>{children}</> : null;
}