export const API_BASE = 'http://localhost:3000';

export const ApiRoutes = {
  STATUS: `${API_BASE}/integration/status`,
  GITHUB_AUTH: `${API_BASE}/auth/github`,
  RESYNC: `${API_BASE}/integration/resync`,
  REMOVE: `${API_BASE}/integration/remove`
};