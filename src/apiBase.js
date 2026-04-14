/**
 * - Development (`npm run dev`): leave VITE_API_URL unset so requests use `/api` and Vite proxies to localhost.
 * - Production (Vercel): uses VITE_API_URL if set, otherwise the Render API below (no env required).
 */
const DEFAULT_PRODUCTION_API = 'https://ged-hotel-backend-2.onrender.com';

const fromEnv = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');

export const API_BASE = import.meta.env.DEV
  ? fromEnv
  : fromEnv || DEFAULT_PRODUCTION_API;

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE) return p;
  return `${API_BASE}${p}`;
}
