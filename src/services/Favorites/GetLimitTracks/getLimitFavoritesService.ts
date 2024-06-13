import axios from "axios";
import { Track } from "./type";

const BASE_URL = "http://localhost:8080";

interface GetLimitTrackFavoritesParams {
  limit: number;
}

export const getLimitTrackFavorites = async ({
  limit,
}: GetLimitTrackFavoritesParams): Promise<Track[]> => {
  try {
    const response = await axios.get<Track[]>(
      `${BASE_URL}/favorites/getLimitTracks`,
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
