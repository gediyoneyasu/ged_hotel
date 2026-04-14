/**
 * In development, leave VITE_API_URL unset so requests use `/api` and Vite proxies to the backend.
 * On Vercel, set VITE_API_URL to your deployed API origin (e.g. https://your-api.onrender.com).
 */
const BASE_URL = 'https://ged-hotel-backend-2.onrender.com';
const raw = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');

export const API_BASE = raw;

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE) return p;
  return `${API_BASE}${p}`;
}
