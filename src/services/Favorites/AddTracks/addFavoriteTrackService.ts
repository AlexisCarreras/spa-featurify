import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addFavoriteTrackService = async (body: AddFavoriteRequestBody) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/favorites/saveTrack`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar el track a favoritos:", error);
    throw new Error("Error al agregar el track a favoritos");
  }
};
