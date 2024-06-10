export interface UserImage {
  url: string;
  height: number;
  width: number;
}

export interface DataUser {
  countryUser: string;
  idUser: string;
  displayName: string;
  emailUser: string;
  type: string;
  productUser: string;
  followers: number;
  images: UserImage[];
}
