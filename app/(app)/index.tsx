import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '.././context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user?.name}</Text>
      <Text>Papel atual: {user?.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  title: { fontSize: 20, fontWeight: 'bold' },
});