import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const playTrackService = async (idTrack: string): Promise<void> => {
  try {
    const uri = `spotify:track:${idTrack}`;
    const encodedUri = encodeURIComponent(uri);
    const response = await axios.get(
      `${BASE_URL}/track/playTrack?uri=${encodedUri}`
    );
    console.log("Track is playing", response);
  } catch (error) {
    console.error("Error playing track:", error);
  }
};
