import axios from "axios";
import { Track } from "./type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface GetLimitTrackFavoritesParams {
  limit: number;
}

export const getLimitTrackFavorites = async ({
  limit,
}: GetLimitTrackFavoritesParams): Promise<Track[]> => {
  try {
    const response = await axios.get<Track[]>(
      `${API_BASE_URL}/favorites/getLimitTracks`,
      {
        params: { limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite tracks:", error);
    throw error;
  }
};
