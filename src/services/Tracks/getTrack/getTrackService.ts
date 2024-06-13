import axios from "axios";
import { Track } from "./type";

const BASE_URL = "http://localhost:8080";

export const getTrackService = async (idTrack: string): Promise<Track> => {
  try {
    const response = await axios.get<Track>(
      `${BASE_URL}/track/getTrack?q=${idTrack}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching track:", error);
    throw error;
  }
};
