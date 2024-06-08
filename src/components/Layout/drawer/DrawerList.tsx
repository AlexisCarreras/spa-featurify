import { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Troubleshoot,
  FavoriteBorder,
  ManageAccounts,
  Album,
} from "@mui/icons-material";

import { NavLink, useLocation } from "react-router-dom";

import styles from "./styles.module.css";
import "./stylesMUI.css";

export const DrawerList = () => {
  const location = useLocation();

  const [linkActive, setLinkActive] = useState({
    search: false,
    favorites: false,
    account: false,
  });

  useEffect(() => {
    if (location.pathname === "/") {
      setLinkActive({ search: true, favorites: false, account: false });
    } else if (location.pathname === "/favorites") {
      setLinkActive({ search: false, favorites: true, account: false });
    } else if (location.pathname === "/account") {
      setLinkActive({ search: false, favorites: false, account: true });
    }
  }, [location.pathname]);

  return (
    <div>
      <Toolbar className={styles.toolbar}>
        <Album sx={{ fontSize: 50 }} className={styles.logo} />
        <div className={styles.containerTextLogo}>
          <Typography variant="h5" className={styles.nameLogo}>
            Featurify
          </Typography>
          <Typography variant="h6" className={styles.descriptionLogo}>
            Audio Análisis
          </Typography>
        </div>
      </Toolbar>
      <Divider color="#434a60" />
      <List className={styles.list}>
        <ListItem
          className={
            linkActive.search ? styles.listItemActive : styles.listItem
          }
        >
          <NavLink to="/" className={styles.navLink}>
            <ListItemButton>
              <ListItemIcon className={styles.containerIcon}>
                <Troubleshoot
                  className={
                    linkActive.search ? styles.iconActive : styles.icon
                  }
                />
              </ListItemIcon>
              <ListItemText
                className={
                  linkActive.search ? styles.itemTextActive : styles.itemText
                }
                primary="Buscar Track"
              />
            </ListItemButton>
          </NavLink>
        </ListItem>

        <NavLink to="/favorites">
          <ListItem
            className={
              linkActive.favorites ? styles.listItemActive : styles.listItem
            }
          >
            <ListItemButton>
              <ListItemIcon className={styles.containerIcon}>
                <FavoriteBorder
                  className={
                    linkActive.favorites ? styles.iconActive : styles.icon
                  }
                />
              </ListItemIcon>
              <ListItemText
                className={
                  linkActive.favorites ? styles.itemTextActive : styles.itemText
                }
                primary="Mis Favoritos"
              />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink to="/account">
          <ListItem
            className={
              linkActive.account ? styles.listItemActive : styles.listItem
            }
          >
            <ListItemButton>
              <ListItemIcon className={styles.containerIcon}>
                <ManageAccounts
                  className={
                    linkActive.account ? styles.iconActive : styles.icon
                  }
                />
              </ListItemIcon>
              <ListItemText
                className={
                  linkActive.account ? styles.itemTextActive : styles.itemText
                }
                primary="Mi Cuenta"
              />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};
