import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";

import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { User } from "../../../services/User/getUser/type";
import { getUser } from "../../../services/User/getUser/getUser";

export const AvatarUser = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Configuración de cuenta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user?.images && user.images.length > 0 ? (
              <Avatar src={user.images[0].url} />
            ) : (
              <Avatar />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        className={styles.menu}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={styles.containerDataUser}>
          {user && (
            <>
              <Typography className={styles.nameUser} variant="h6">
                {user.displayName}
              </Typography>
              <Typography className={styles.emailUser} variant="subtitle2">
                {user.emailUser}
              </Typography>
            </>
          )}
        </div>
        <Divider className={styles.divider} />
        <Link to="/account">
          <MenuItem className={styles.itemIcon} onClick={handleClose}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Perfil
          </MenuItem>
        </Link>
        <MenuItem className={styles.itemIcon} onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </>
  );
};
