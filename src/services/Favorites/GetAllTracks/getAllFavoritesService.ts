import axios from "axios";
import { GetAllFavoritesTrack } from "./type";

const API_BASE_URL = "http://localhost:8080";

export const getAllFavoritesService = async (): Promise<
  GetAllFavoritesTrack[]
> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites/GetAllTracks`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los tracks favoritos", error);
    throw error;
  }
};
