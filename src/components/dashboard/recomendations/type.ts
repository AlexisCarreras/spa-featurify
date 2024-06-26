export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Album {
  idAlbum: string;
  nameAlbum: string;
  images: Image[];
}

export interface Artist {
  idArtist: string;
  nameArtist: string;
}

export interface Track {
  idTrack: string;
  type: string;
  nameTrack: string;
  durationMs: number;
  explicit: boolean;
  artist: { idArtist: string; nameArtist: string }[];
  album: {
    idAlbum: string;
    nameAlbum: string;
    images: { url: string; height: number; width: number }[];
  };
  isFavorite?: boolean;
}

export interface Recommendation {
  tracks: Track[];
}

export type DataRecommendations = Recommendation[];
