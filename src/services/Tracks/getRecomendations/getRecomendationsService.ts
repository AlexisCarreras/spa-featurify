import axios from "axios";
import { GetRecommendationsResponse } from "./type";

const API_BASE_URL = "http://localhost:8080";

export const getRecommendationsService = async (
  limit: number,
  seedTracks: string,
  seedArtists: string
): Promise<GetRecommendationsResponse> => {
  try {
    const response = await axios.get<GetRecommendationsResponse>(
      `${API_BASE_URL}/track/tracksRecomendations`,
      {
        params: {
          limit,
          seed_tracks: seedTracks,
          seed_artists: seedArtists,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
