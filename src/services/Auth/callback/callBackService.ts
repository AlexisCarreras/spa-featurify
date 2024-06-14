import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCallbackService = async (
  code: string,
  state: string
): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/callback`, {
      params: {
        code,
        state,
      },
    });
    return response.data; // Dependiendo de lo que devuelva el endpoint
  } catch (error) {
    console.error("Error al obtener el callback", error);
    throw error;
  }
};
