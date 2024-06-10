interface Image {
  url: string;
  height: number;
  width: number;
}

interface Album {
  idAlbum: string;
  nameAlbum: string;
  images: Image[];
}

interface Artist {
  idArtist: string;
  nameArtist: string;
}

export interface Track {
  idTrack: string;
  type: string;
  nameTrack: string;
  durationMs: number;
  explicit: boolean;
  artist: Artist[];
  album: Album;
  isFavorite?: boolean;
}

export interface DataSearch {
  limit: number;
  items: Track[];
}
