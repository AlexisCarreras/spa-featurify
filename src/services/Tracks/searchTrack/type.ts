interface Artist {
  idArtist: string;
  nameArtist: string;
}

interface AlbumImage {
  url: string;
  height: number;
  width: number;
}

interface Album {
  idAlbum: string;
  nameAlbum: string;
  images: AlbumImage[];
}

interface Track {
  idTrack: string;
  type: string;
  nameTrack: string;
  durationMs: number;
  explicit: boolean;
  artist: Artist[];
  album: Album;
}

export interface SearchTracksResponse {
  limit: number;
  items: Track[];
}
