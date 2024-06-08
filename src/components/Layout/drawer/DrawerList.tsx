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

import styles from "./styles.module.css";
import "./stylesMUI.css";

export const DrawerList = () => {
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
        <ListItem className={styles.listItem}>
          <ListItemButton>
            <ListItemIcon className={styles.containerIcon}>
              <Troubleshoot className={styles.icon} />
            </ListItemIcon>
            <ListItemText className={styles.itemText} primary="Buscar Track" />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemButton>
            <ListItemIcon className={styles.containerIcon}>
              <FavoriteBorder className={styles.icon} />
            </ListItemIcon>
            <ListItemText className={styles.itemText} primary="Mis Favoritos" />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemButton>
            <ListItemIcon className={styles.containerIcon}>
              <ManageAccounts className={styles.icon} />
            </ListItemIcon>
            <ListItemText className={styles.itemText} primary="Mi Cuenta" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};
