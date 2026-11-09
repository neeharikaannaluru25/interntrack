const USERS_KEY = 'interntrack.users.v1';
const SESSION_KEY = 'interntrack.session.v1';
const DATA_PREFIX = 'interntrack.data.v1.';

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const normalizeEmail = (email) => email.trim().toLowerCase();

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function readSession() {
  const email = readJSON(SESSION_KEY, '');
  if (!email) return null;
  const users = readJSON(USERS_KEY, []);
  return users.find((user) => user.email === email) ?? null;
}

export async function registerAccount({ name, email, password }) {
  const cleanEmail = normalizeEmail(email);
  const users = readJSON(USERS_KEY, []);
  if (users.some((user) => user.email === cleanEmail)) {
    throw new Error('An account with this email already exists. Try signing in.');
  }

  const user = { name: name.trim(), email: cleanEmail, passwordHash: await hashPassword(password) };
  writeJSON(USERS_KEY, [...users, user]);
  writeJSON(SESSION_KEY, cleanEmail);
  return user;
}

export async function signIn({ email, password }) {
  const cleanEmail = normalizeEmail(email);
  const users = readJSON(USERS_KEY, []);
  const user = users.find((item) => item.email === cleanEmail);
  if (!user || user.passwordHash !== await hashPassword(password)) {
    throw new Error('Email or password is incorrect.');
  }
  writeJSON(SESSION_KEY, cleanEmail);
  return user;
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function readUserData(email) {
  return readJSON(`${DATA_PREFIX}${normalizeEmail(email)}`, null);
}

export function writeUserData(email, data) {
  writeJSON(`${DATA_PREFIX}${normalizeEmail(email)}`, data);
}

export function createInitialUserData(user) {
  return {
    profile: { name: user.name, email: user.email, education: '', skills: [] },
    savedIds: [],
    applications: {},
  };
}
