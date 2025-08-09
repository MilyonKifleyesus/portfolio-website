const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? window.location.origin : 'http://localhost:5000');

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: `${API_BASE_URL}/api/auth/signin`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  },
  PROJECTS: `${API_BASE_URL}/api/projects`,
  QUALIFICATIONS: `${API_BASE_URL}/api/qualifications`,
  CONTACTS: `${API_BASE_URL}/api/contacts`,
  USERS: `${API_BASE_URL}/api/users`,
};

export default API_BASE_URL;
