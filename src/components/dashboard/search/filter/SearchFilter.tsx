import { Button, Card, InputAdornment, OutlinedInput } from "@mui/material";
import { Search, Send } from "@mui/icons-material";
import style from "./style.module.css";
import { SearchFilterProps } from "./type";

export const SearchFilter: React.FunctionComponent<SearchFilterProps> = ({
  showTable,
  setShowTable,
}) => {
  return (
    <Card className={style.card} sx={{ p: 2 }}>
      <OutlinedInput
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
        onClick={() => setShowTable(!showTable)}
        className={style.button}
        variant="contained"
        endIcon={<Send />}
      >
        Buscar
      </Button>
    </Card>
  );
};
