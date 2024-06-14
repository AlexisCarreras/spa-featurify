import { AppBar, Divider, IconButton, Toolbar } from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Troubleshoot as TroubleshootIcon,
  Favorite as FavoriteIcon,
  Recommend as RecommendIcon,
  ManageAccounts as ManageAccountsIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import styles from "./styles.module.css";
import { TopBarProps } from "./type";
import { AvatarUser } from "../avatar/AvatarUser";

export const TopBar: React.FunctionComponent<TopBarProps> = ({
  handleDrawerToggle,
  drawerWidth,
}) => {
  const location = useLocation();

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
        {location.pathname === "/" ? (
          <SearchIcon className={styles.searchIcon} />
        ) : location.pathname === "/audio-analisis" ? (
          <TroubleshootIcon className={styles.searchIcon} />
        ) : location.pathname === "/favorites" ? (
          <FavoriteIcon className={styles.searchIcon} />
        ) : location.pathname === "/recomendations" ? (
          <RecommendIcon className={styles.searchIcon} />
        ) : location.pathname === "/account" ? (
          <ManageAccountsIcon className={styles.searchIcon} />
        ) : (
          <></>
        )}
        <AvatarUser />
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
