import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Troubleshoot,
  FavoriteBorder,
  ManageAccounts,
} from "@mui/icons-material";

import styles from "./styles.module.css";
import "./stylesMUI.css";

export const DrawerList = () => {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem className={styles.listItem}>
          <ListItemButton>
            <ListItemIcon>
              <Troubleshoot className={styles.icon} />
            </ListItemIcon>
            <ListItemText className={styles.itemText} primary="Buscar Track" />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteBorder className={styles.icon} />
            </ListItemIcon>
            <ListItemText className={styles.itemText} primary="Mis Favoritos" />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccounts className={styles.icon} />
            </ListItemIcon>
            <ListItemText className={styles.itemText} primary="Mi Cuenta" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};
