import { Button, Card, InputAdornment, OutlinedInput } from "@mui/material";
import { Search, Send } from "@mui/icons-material";
import style from "./style.module.css";
import { SearchFilterProps } from "./type";

export const SearchFilter: React.FunctionComponent<SearchFilterProps> = ({
  query,
  setQuery,
  onSearch,
}) => {
  return (
    <Card className={style.card} sx={{ p: 2 }}>
      <OutlinedInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={style.searchInput}
        fullWidth
        placeholder="Nombre del Track"
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        sx={{
          maxWidth: "500px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4e36f5",
          },
        }}
      />
      <Button
        disabled={!query}
        onClick={onSearch}
        className={style.button}
        variant="contained"
        endIcon={<Send />}
      >
        Buscar
      </Button>
    </Card>
  );
};
