import axios from "axios";
import { AudioFeatures } from "./type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAudioFeaturesService = async (
  idTrack: string
): Promise<AudioFeatures> => {
  try {
    const response = await axios.get<AudioFeatures>(
      `${API_BASE_URL}/track/audioFeature?q=${idTrack}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching audio features:", error);
    throw error;
  }
};
