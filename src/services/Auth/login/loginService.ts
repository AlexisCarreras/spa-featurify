export const loginService = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  window.location.href = `${API_BASE_URL}/auth/login`;
};
