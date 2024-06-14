import axios from "axios";
import { Track } from "./type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTrackService = async (idTrack: string): Promise<Track> => {
  try {
    const response = await axios.get<Track>(
      `${API_BASE_URL}/track/getTrack?q=${idTrack}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching track:", error);
    throw error;
  }
};
