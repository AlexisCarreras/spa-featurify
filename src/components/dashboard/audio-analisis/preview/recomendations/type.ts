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
  album: Album;
  artists: Artist[];
  idTrack: string;
  nameTrack: string;
  duration_ms: number;
  explicit: boolean;
  type: string;
}

export interface DataRecomendationsPreview {
  tracks: Track[];
}
