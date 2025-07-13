export interface Diagnostic {
  id: string;
  prenom?: string;
  nom?: string;
  email?: string;
  message?: string;
  createdAt?: number;
}

const DIAG_KEY = 'mt-diagnostics';
const COACH_KEY = 'mt-coaching';

function loadArray(key: string): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
}
function saveArray(key: string, arr: any[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(arr));
  }
}

export function saveDiagnostic(data: Omit<Diagnostic, 'id'>) {
  const arr = loadArray(DIAG_KEY);
  const entry: Diagnostic = {
    id: Date.now().toString(),
    createdAt: Date.now(),
    ...data,
  };
  arr.push(entry);
  saveArray(DIAG_KEY, arr);
  return entry;
}

export function getDiagnostics(email?: string): Diagnostic[] {
  const arr = loadArray(DIAG_KEY) as Diagnostic[];
  if (email) return arr.filter((d) => d.email === email);
  return arr;
}

export function getCoaching(uid: string): any {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(COACH_KEY);
    if (!data) return null;
    const obj = JSON.parse(data);
    return obj[uid] || null;
  } catch {
    return null;
  }
}
