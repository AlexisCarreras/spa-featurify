import axios from "axios";
import { AudioFeatures } from "./type";

const BASE_URL = "http://localhost:8080";

export const getAudioFeaturesService = async (
  idTrack: string
): Promise<AudioFeatures> => {
  try {
    const response = await axios.get<AudioFeatures>(
      `${BASE_URL}/track/audioFeature?q=${idTrack}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching audio features:", error);
    throw error;
  }
};
