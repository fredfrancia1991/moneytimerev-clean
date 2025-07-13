export interface LocalUser {
  uid: string;
  email: string;
  password: string;
  role?: string;
}

const USERS_KEY = 'mt-users';
const CURRENT_KEY = 'mt-current-user';

const defaultUsers: LocalUser[] = [
  { uid: '1', email: 'admin@example.com', password: 'admin', role: 'admin' },
  { uid: '2', email: 'user@example.com', password: 'user', role: 'client' },
];

function loadUsers(): LocalUser[] {
  if (typeof window === 'undefined') return defaultUsers;
  try {
    const data = localStorage.getItem(USERS_KEY);
    if (!data) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(data);
  } catch {
    return defaultUsers;
  }
}

function saveCurrentUser(user: LocalUser | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_KEY);
  }
}

function getCurrentUser(): LocalUser | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CURRENT_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

const listeners: ((user: LocalUser | null) => void)[] = [];
function notify() {
  const u = getCurrentUser();
  listeners.forEach((cb) => cb(u));
}

export function onAuthStateChanged(callback: (user: LocalUser | null) => void) {
  listeners.push(callback);
  callback(getCurrentUser());
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

export async function signIn(email: string, password: string) {
  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Identifiants incorrects');
  saveCurrentUser(user);
  notify();
  return { user };
}

export async function signOut() {
  saveCurrentUser(null);
  notify();
}

export { getCurrentUser };
