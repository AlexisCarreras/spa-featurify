export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Album {
  idAlbum: string;
  type: string;
  typeAlbum: string;
  nameAlbum: string;
  totalTracks: number;
  releaseDate: string;
  images: Image[];
}

export interface Artist {
  idArtist: string;
  nameArtist: string;
  type: string;
}

export interface Track {
  idTrack: string;
  uriTrack: string;
  type: string;
  nameTrack: string;
  previewTrackUrl: string;
  durationMs: number;
  trackNumber: number;
  explicit: boolean;
  artists: Artist[];
  album: Album;
}
