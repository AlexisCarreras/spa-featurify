import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

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
