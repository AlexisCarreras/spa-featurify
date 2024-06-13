export interface AlbumImage {
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
  images: AlbumImage[];
}

export interface AlbumDetailsProps {
  album: Album;
  loadingTrack: boolean;
}
