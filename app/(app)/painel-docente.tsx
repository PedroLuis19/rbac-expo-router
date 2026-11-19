import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PainelDocenteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Docente</Text>
      <Text>Visível apenas para professor e admin.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  title: { fontSize: 20, fontWeight: 'bold' },
});