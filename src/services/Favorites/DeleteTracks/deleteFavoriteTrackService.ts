import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const deleteFavoriteTrackService = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/favorites/deleteTrack/${id}`);
  } catch (error) {
    console.error("Error al eliminar el track de favoritos", error);
    throw error;
  }
};
