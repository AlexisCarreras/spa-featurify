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
  _id: string;
  isFavorite: boolean;
  album: Album;
  artists: Artist[];
  idTrack: string;
  nameTrack: string;
  duration_ms: number;
  explicit: boolean;
  type: string;
}

export interface Recommendation {
  tracks: Track[];
}

export type DataRecommendations = Recommendation[];
