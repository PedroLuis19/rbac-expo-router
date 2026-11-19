export type Role = 'aluno' | 'professor' | 'admin' | 'monitor';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[];
}

const USERS_DB: Record<string, { password: string; user: AuthUser }> = {
  'aluno@aula.dev': {
    password: '123456',
    user: {
      id: '1',
      name: 'Aluno Exemplo',
      email: 'aluno@aula.dev',
      role: 'aluno',
      permissions: ['turma.ver'],
    },
  },
  'monitor@aula.dev': {
    password: '123456',
    user: {
      id: '2',
      name: 'Monitor Lucas',
      email: 'monitor@aula.dev',
      role: 'monitor',
      permissions: ['turma.ver'],
    },
  },
  'professor@aula.dev': {
    password: '123456',
    user: {
      id: '3',
      name: 'Professora Helena',
      email: 'professor@aula.dev',
      role: 'professor',
      permissions: ['turma.ver', 'turma.excluir', 'docente.acessar'],
    },
  },
  'admin@aula.dev': {
    password: '123456',
    user: {
      id: '4',
      name: 'Admin Sistema',
      email: 'admin@aula.dev',
      role: 'admin',
      permissions: ['turma.ver', 'turma.excluir', 'docente.acessar', 'admin.acessar'],
    },
  },
};

function encodeToken(email: string): string {
  const bytes = new TextEncoder().encode(email);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decodeToken(token: string): string {
  const binary = atob(token);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export async function loginRequest(
  email: string,
  password: string
): Promise<{ token: string; user: AuthUser }> {
  await new Promise((r) => setTimeout(r, 300));
  const normalized = email.trim().toLowerCase();
  const entry = USERS_DB[normalized];

  if (!entry || entry.password !== password) {
    throw new Error('E-mail ou senha inválidos.');
  }

  return {
    token: encodeToken(normalized),
    user: entry.user,
  };
}

export async function meRequest(token: string): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 250));
  const email = decodeToken(token);
  const entry = USERS_DB[email];

  if (!entry) {
    throw new Error('401 Unauthorized: sessão inválida.');
  }

  return entry.user;
}

export async function deleteTurmaRequest(
  token: string,
  turmaId: string
): Promise<{ ok: true }> {
  const currentUser = await meRequest(token);
  const allowedRoles: Role[] = ['professor', 'admin'];

  if (!allowedRoles.includes(currentUser.role)) {
    const error = new Error(
      `403 Forbidden: papel "${currentUser.role}" não pode excluir turmas.`
    ) as Error & { status?: number };
    error.status = 403;
    throw error;
  }

  await new Promise((r) => setTimeout(r, 250));
  return { ok: true };
}