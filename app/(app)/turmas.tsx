import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '.././context/AuthContext';
import { RequireRole } from '.././auth/RequireRole';
import { deleteTurmaRequest } from '.././services/api';

export default function TurmasScreen() {
  const { token } = useAuth();
  const [feedback, setFeedback] = useState('');

  async function handleDelete(forceAttempt: boolean) {
    if (!token) return;
    try {
      await deleteTurmaRequest(token, 'turma-01');
      const okMsg = '200 OK: Turma excluída.';
      setFeedback(okMsg);
      Alert.alert('Sucesso', okMsg);
    } catch (err: any) {
      const errMsg = err?.message || 'Erro na requisição.';
      setFeedback(errMsg);
      if (forceAttempt) {
        Alert.alert('Resposta da API', errMsg);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turmas</Text>

      <RequireRole roles={['professor', 'admin']}>
        <Button title="Excluir turma" color="#c62828" onPress={() => handleDelete(false)} />
      </RequireRole>

      <Button title="Tentar excluir mesmo assim" onPress={() => handleDelete(true)} />

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 22, fontWeight: 'bold' },
  feedback: { marginTop: 8, fontFamily: 'monospace' },
});