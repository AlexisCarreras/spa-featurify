export interface AlbumImage {
  url: string;
  height: number;
  width: number;
}

export interface DataAlbumDetails {
  idAlbum: string;
  type: string;
  typeAlbum: string;
  nameAlbum: string;
  totalTracks: number;
  releaseDate: string;
  images: AlbumImage[];
}
