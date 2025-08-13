import { User } from "@/types/entity-types";

export type AuthRecord = {
  token: string;
  user: User;
  expiresAt: string;
};

const KEY = "auth";
const SKEW_MS = 10_000;

function parseJSON<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setAuth(
  data: Partial<AuthRecord> & {
    token: string;
    user: User;
    expiresAt?: string;
    exp?: number;
  }
) {
  const expiresAt =
    data.expiresAt ??
    (typeof data.exp === "number"
      ? new Date(data.exp * 1000).toISOString()
      : undefined);

  if (!expiresAt) {
    throw new Error("Cannot persist auth without expiresAt/exp");
  }

  const record: AuthRecord = {
    token: data.token,
    user: data.user,
    expiresAt,
  };

  localStorage.setItem(KEY, JSON.stringify(record));
}

export function getAuth(): AuthRecord | null {
  const record = parseJSON<AuthRecord>(localStorage.getItem(KEY));
  if (!record || !record.token || !record.user || !record.expiresAt)
    return null;
  return record;
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}

export function getToken(): string | null {
  return getAuth()?.token ?? null;
}

export function getUser(): User | null {
  return getAuth()?.user ?? null;
}

export function isExpired(expiresAtISO: string, skewMs = SKEW_MS): boolean {
  const now = Date.now();
  const expMs = Date.parse(expiresAtISO);
  return Number.isFinite(expMs) ? now + skewMs >= expMs : true;
}

export function isAuthenticated(): boolean {
  const auth = getAuth();
  if (!auth) return false;
  if (!auth.user || !auth.token) return false;
  return !isExpired(auth.expiresAt);
}

export function getRemainingMs(): number {
  const auth = getAuth();
  if (!auth) return 0;
  const expMs = Date.parse(auth.expiresAt);
  return Math.max(0, expMs - Date.now());
}
