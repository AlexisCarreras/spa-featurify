import axios from "axios";
import { User } from "./type";

const API_BASE_URL = "http://localhost:8080";

export const getUser = async (): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/userMe`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario", error);
    throw error;
  }
};
