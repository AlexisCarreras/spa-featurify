import { useState, useEffect } from "react";
import { Alert, Box, Chip, Stack, Typography } from "@mui/material";
import { SearchFilter } from "../../../components/dashboard/search/filter/SearchFilter";
import { TableSearch } from "../../../components/dashboard/search/table/TableSearch";

import { features } from "./utils";

import { Track } from "./type";
import { searchTracks } from "../../../services/Tracks/searchTrack/searchTrackService";

import { useLocation, useNavigate } from "react-router-dom";

import style from "./style.module.css";
import "./stylesMUI.css";
import { getAllFavoritesService } from "../../../services/Favorites/GetAllTracks/getAllFavoritesService";
import { GetAllFavoritesTrack } from "../../../services/Favorites/GetAllTracks/type";
import { UseLoading } from "../../../hooks/UseLoading";

export const Search = () => {
  // Datos de INICIO DE SESION
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");
    const refreshToken = queryParams.get("refresh_token");
    const expiresIn = queryParams.get("expires_in");

    if (accessToken && refreshToken && expiresIn) {
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);
      sessionStorage.setItem("expires_in", expiresIn);

      // Limpiar los parámetros de la URL
      navigate("/search", { replace: true });
    } else {
      const storedAccessToken = sessionStorage.getItem("access_token");
      if (!storedAccessToken) {
        navigate("/");
      }
    }
  }, [location, navigate]);

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
        <UseLoading height="37vh" size={100} />
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
