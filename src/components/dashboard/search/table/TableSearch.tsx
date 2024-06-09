import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, Leaderboard } from "@mui/icons-material";

import style from "./style.module.css";

export const TableSearch = () => {
  const tracks = [
    {
      _id: "665f774dcdd401184e927479",
      isFavorite: true,
      album: {
        idAlbum: "3dmpzbEi58510nnn3Wvmac",
        nameAlbum: "Cada Vez Mas Pelotudos",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b273aae24ded1aed28f578913ab4",
            height: 640,
            width: 640,
            _id: "665f774dcdd401184e92747b",
          },
          {
            url: "https://i.scdn.co/image/ab67616d00001e02aae24ded1aed28f578913ab4",
            height: 300,
            width: 300,
            _id: "665f774dcdd401184e92747c",
          },
          {
            url: "https://i.scdn.co/image/ab67616d00004851aae24ded1aed28f578913ab4",
            height: 64,
            width: 64,
            _id: "665f774dcdd401184e92747d",
          },
        ],
        _id: "665f774dcdd401184e92747a",
      },
      artist: [
        {
          idArtist: "0iy7QDMTG00FqTFtlnImPO",
          nameArtist: "Asspera",
          _id: "665f774dcdd401184e92747e",
        },
      ],
      idTrack: "2JV7HECAjksEeHh31Pg8b3",
      nameTrack: "El Peaje Más Caro del Mundo",
      __v: 0,
    },
    {
      _id: "665f7e19bc050f38f64e3714",
      isFavorite: false,
      album: {
        idAlbum: "1iUFO4NXsxz14ZdDZI31T4",
        nameAlbum: "El Impulso",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b273de7dc949dcba1d75b87f430e",
            height: 640,
            width: 640,
            _id: "665f7e19bc050f38f64e3716",
          },
          {
            url: "https://i.scdn.co/image/ab67616d00001e02de7dc949dcba1d75b87f430e",
            height: 300,
            width: 300,
            _id: "665f7e19bc050f38f64e3717",
          },
          {
            url: "https://i.scdn.co/image/ab67616d00004851de7dc949dcba1d75b87f430e",
            height: 64,
            width: 64,
            _id: "665f7e19bc050f38f64e3718",
          },
        ],
        _id: "665f7e19bc050f38f64e3715",
      },
      artist: [
        {
          idArtist: "6nVcjUJemqpJjc1WevwTvL",
          nameArtist: "La Vela Puerca",
          _id: "665f7e19bc050f38f64e3719",
        },
      ],
      idTrack: "270ieNCOt945nOdUQubFI5",
      nameTrack: "Para No Verme Más",
      __v: 0,
    },
    {
      _id: "665fc6bd19371952c36e3b89",
      isFavorite: true,
      album: {
        idAlbum: "0SEFt7lxueoLxLh5d2QiMO",
        nameAlbum: "Un Asado En Abbey Road",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b2735079184c2a4d4edcb0b7fa5a",
            height: 640,
            width: 640,
            _id: "665fc6bd19371952c36e3b8b",
          },
          {
            url: "https://i.scdn.co/image/ab67616d00001e025079184c2a4d4edcb0b7fa5a",
            height: 300,
            width: 300,
            _id: "665fc6bd19371952c36e3b8c",
          },
          {
            url: "https://i.scdn.co/image/ab67616d000048515079184c2a4d4edcb0b7fa5a",
            height: 64,
            width: 64,
            _id: "665fc6bd19371952c36e3b8d",
          },
        ],
        _id: "665fc6bd19371952c36e3b8a",
      },
      artist: [
        {
          idArtist: "2MLiASzGQHVMyORIApRGsp",
          nameArtist: "Kapanga",
          _id: "665fc6bd19371952c36e3b8e",
        },
      ],
      idTrack: "3jtphjie8vn4Q80ZQj82TI",
      nameTrack: "Indultados",
      __v: 0,
    },
    {
      _id: "66612440b02d151502183ad4",
      isFavorite: false,
      album: {
        idAlbum: "7L6gLnSJBTU0tOneX0Ol91",
        nameAlbum: "CARAVANA",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b2730464a4a2b1558725d9d97277",
            height: 640,
            width: 640,
            _id: "66612440b02d151502183ad6",
          },
          {
            url: "https://i.scdn.co/image/ab67616d00001e020464a4a2b1558725d9d97277",
            height: 300,
            width: 300,
            _id: "66612440b02d151502183ad7",
          },
          {
            url: "https://i.scdn.co/image/ab67616d000048510464a4a2b1558725d9d97277",
            height: 64,
            width: 64,
            _id: "66612440b02d151502183ad8",
          },
        ],
        _id: "66612440b02d151502183ad5",
      },
      artist: [
        {
          idArtist: "5YCc6xS5Gpj3EkaYGdjyNK",
          nameArtist: "WOS",
          _id: "66612440b02d151502183ad9",
        },
      ],
      idTrack: "0blWPYAfbvpRLVHUcmqmmj",
      nameTrack: "FRESCO",
      __v: 0,
    },
  ];

  function noop(): void {
    // do nothing
  }

  const dataTable = [
    "Track",
    "Artista",
    "Album",
    "Favorito",
    "Obtener Análisis",
  ];

  return (
    <Card className={style.card}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead className={style.tableHead}>
            <TableRow>
              {dataTable.map((item: string) => {
                return (
                  <TableCell className={style.tableCell}>{item}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track: any) => {
              return (
                <TableRow hover>
                  <TableCell>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Avatar src={track.album.images[0].url} />
                      <Typography variant="subtitle2">
                        {track.nameTrack}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{track.artist[0].nameArtist}</TableCell>
                  <TableCell>{track.album.nameAlbum}</TableCell>
                  <TableCell>
                    {track.isFavorite ? (
                      <Favorite className={style.icon} />
                    ) : (
                      <FavoriteBorder className={style.icon} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<Leaderboard />}
                      className={style.button}
                    >
                      Ver Análisis
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={5}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
