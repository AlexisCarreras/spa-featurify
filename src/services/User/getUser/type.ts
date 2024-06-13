export interface User {
  countryUser: string;
  idUser: string;
  displayName: string;
  emailUser: string;
  type: string;
  productUser: string;
  followers: number;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
}
