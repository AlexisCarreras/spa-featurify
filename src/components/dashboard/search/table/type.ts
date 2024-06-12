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
  
  export interface TableSearchProps {
    tracks: Track[];
  }
  