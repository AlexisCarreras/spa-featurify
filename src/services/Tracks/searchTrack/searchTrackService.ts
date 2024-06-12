import axios from "axios";
import { SearchTracksResponse } from "./type";

const API_BASE_URL = "http://localhost:8080";

export const searchTracks = async (
  query: string
): Promise<SearchTracksResponse> => {
  try {
    const response = await axios.get<SearchTracksResponse>(
      `${API_BASE_URL}/track/searchTracks`,
      {
        params: { q: query },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw error;
  }
};
