import { Card, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import style from "./style.module.css";

export const SearchFilter = () => {
  return (
    <Card className={style.card} sx={{ p: 2 }}>
      <OutlinedInput
        className={style.searchInput}
        fullWidth
        placeholder="Nombre del Track"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{
          maxWidth: "500px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4e36f5",
          },
        }}
      />
    </Card>
  );
};
