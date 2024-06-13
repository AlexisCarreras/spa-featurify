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
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.data.retryAfter;
      console.error(
        `Too many requests. Please try again after ${retryAfter} seconds.`
      );
    } else {
      console.error(
        "Error fetching recommendations:",
        error.response ? error.response.data : error.message
      );
    }
    throw error;
  }
};
