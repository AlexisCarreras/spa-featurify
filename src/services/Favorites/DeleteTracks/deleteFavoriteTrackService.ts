import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteFavoriteTrackService = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/favorites/deleteTrack/${id}`);
  } catch (error) {
    console.error("Error al eliminar el track de favoritos", error);
    throw error;
  }
};
