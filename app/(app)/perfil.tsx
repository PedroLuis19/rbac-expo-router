import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '.././context/AuthContext';

export default function PerfilScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Nome: {user?.name}</Text>
      <Text>E-mail: {user?.email}</Text>
      <Text>Papel: {user?.role}</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 10 },
  title: { fontSize: 22, fontWeight: 'bold' },
});