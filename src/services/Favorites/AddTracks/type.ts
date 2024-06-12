interface AddFavoriteRequestBody {
  album: {
    idAlbum: string;
    nameAlbum: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  artist: {
    idArtist: string;
    nameArtist: string;
  }[];
  idTrack: string;
  nameTrack: string;
}
