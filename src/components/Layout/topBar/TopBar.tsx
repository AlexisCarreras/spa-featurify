import { AppBar, Divider, IconButton, Toolbar, Tooltip } from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";

import styles from "./styles.module.css";
import { TopBarProps } from "./type";
import { AvatarUser } from "../avatar/AvatarUser";

export const TopBar: React.FunctionComponent<TopBarProps> = ({
  handleDrawerToggle,
  drawerWidth,
}) => {
  return (
    <AppBar
      position="fixed"
      className={styles.topBar}
      color="inherit"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Tooltip title="Buscar Track">
          <IconButton edge="start">
            <SearchIcon className={styles.searchIcon} />
          </IconButton>
        </Tooltip>

        <AvatarUser />
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
