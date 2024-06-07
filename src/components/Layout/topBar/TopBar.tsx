import { AppBar, Avatar, Divider, IconButton, Toolbar } from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";

import styles from "./styles.module.css";
import { TopBarProps } from "./type";

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
        <IconButton edge="start">
          <SearchIcon className={styles.searchIcon} />
        </IconButton>
        <IconButton edge="end">
          <Avatar src="/broken-image.jpg" />
        </IconButton>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
