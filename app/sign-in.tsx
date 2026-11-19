import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from './context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('aluno@aula.dev');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleSignIn(targetEmail = email, targetPassword = password) {
    setLoading(true);
    const result = await signIn(targetEmail, targetPassword);
    setLoading(false);

    if (!result.ok) {
      Alert.alert('Falha no login', result.message || 'Credenciais inválidas.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? 'Entrando...' : 'Entrar'}
        onPress={() => handleSignIn()}
        disabled={loading}
      />

      <View style={styles.shortcuts}>
        <Text style={styles.label}>Atalhos (senha 123456):</Text>
        <Button title="Aluno" onPress={() => handleSignIn('aluno@aula.dev', '123456')} />
        <Button title="Monitor" onPress={() => handleSignIn('monitor@aula.dev', '123456')} />
        <Button title="Professor" onPress={() => handleSignIn('professor@aula.dev', '123456')} />
        <Button title="Admin" onPress={() => handleSignIn('admin@aula.dev', '123456')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  shortcuts: { marginTop: 16, gap: 8 },
  label: { fontWeight: '600' },
});