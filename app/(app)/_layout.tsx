import React from 'react';
import { Tabs } from 'expo-router';
import { useAuth } from '.././context/AuthContext';

export default function AppTabsLayout() {
  const { user } = useAuth();
  const canSeeDocente = user?.role === 'professor' || user?.role === 'admin';
  const canSeeAdmin = user?.role === 'admin';

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="turmas" options={{ title: 'Turmas' }} />
      <Tabs.Protected guard={canSeeDocente}>
        <Tabs.Screen name="painel-docente" options={{ title: 'Docente' }} />
      </Tabs.Protected>
      <Tabs.Protected guard={canSeeAdmin}>
        <Tabs.Screen name="admin" options={{ title: 'Admin' }} />
      </Tabs.Protected>
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}