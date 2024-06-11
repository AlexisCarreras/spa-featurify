export interface Image {
  url: string;
  height: number;
  width: number;
  _id: string;
}

export interface Album {
  idAlbum: string;
  nameAlbum: string;
  images: Image[];
  _id: string;
}

export interface Artist {
  idArtist: string;
  nameArtist: string;
  _id: string;
}

export interface Favorite {
  _id: string;
  album: Album;
  artist: Artist[];
  idTrack: string;
  nameTrack: string;
  __v: number;
}

export type DataFavoritesLimit = Favorite[];
