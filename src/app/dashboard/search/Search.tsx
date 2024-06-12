import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { SearchFilter } from "../../../components/dashboard/search/filter/SearchFilter";
import { TableSearch } from "../../../components/dashboard/search/table/TableSearch";

import { features } from "./utils";

import { Track } from "./type";
import { searchTracks } from "../../../services/Tracks/searchTrack/searchTrackService";

import style from "./style.module.css";
import "./stylesMUI.css";
import { getAllFavoritesService } from "../../../services/Favorites/GetAllTracks/getAllFavoritesService";
import { GetAllFavoritesTrack } from "../../../services/Favorites/GetAllTracks/type";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<GetAllFavoritesTrack[]>([]);

  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteTracks = await getAllFavoritesService();
        setFavorites(favoriteTracks);
      } catch (error) {
        console.error("Error al obtener los tracks favoritos", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchTracks(query);
      setTracks(response.items);
      setShowTable(true);
    } catch (error) {
      setError("Error al obtener los tracks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Stack direction="column" spacing={1}>
        <Stack spacing={1}>
          <Typography className={style.title} variant="h4">
            Buscar Track
          </Typography>
        </Stack>
        <Typography className={style.subtitle} variant="h4">
          Se podrán obtener los siguientes análisis:
        </Typography>
        <Stack className={style.containerChip} spacing={1} direction="row">
          {features.map((feature) => (
            <Chip key={feature} label={feature} />
          ))}
        </Stack>
      </Stack>
      <SearchFilter query={query} setQuery={setQuery} onSearch={handleSearch} />
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "37vh",
          }}
        >
          <CircularProgress sx={{ color: "#4E36F5" }} size={100} />
        </Box>
      ) : (
        showTable && (
          <Box>
            <TableSearch
              key={favorites.length}
              tracks={tracks}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </Box>
        )
      )}
    </Stack>
  );
};
