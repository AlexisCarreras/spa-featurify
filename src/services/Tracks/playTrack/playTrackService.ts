import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const playTrackService = async (idTrack: string): Promise<void> => {
  try {
    const uri = `spotify:track:${idTrack}`;
    const encodedUri = encodeURIComponent(uri);
    await axios.get(`${API_BASE_URL}/track/playTrack?uri=${encodedUri}`);
  } catch (error) {
    console.error("Error playing track:", error);
  }
};
