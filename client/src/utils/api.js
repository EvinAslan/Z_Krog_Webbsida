// Centraliserade API-konstanter - använder relativ sökväg i produktion
export const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:5000';
export const API = import.meta.env.VITE_API_URL || `${API_BASE}/api`;

export default API;
