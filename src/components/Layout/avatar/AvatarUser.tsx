import { useState } from "react";
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

import "./stylesMUI.css";
import { Link } from "react-router-dom";

export const AvatarUser = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
            <Avatar src="https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/441398891_10225283301693785_1703430363880467182_n.jpg?stp=dst-jpg_s320x320&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LD_Z1XoihwwQ7kNvgGOtC8Q&_nc_ht=scontent-iad3-2.xx&edm=AP4hL3IEAAAA&oh=00_AYB6HhDwzG-lrEx9dn4KsdyfsSSR4bKnGsH0_lhkYa7vww&oe=666A3E85" />
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
          <Typography className={styles.nameUser} variant="h6">
            Alexis Carreras
          </Typography>
          <Typography className={styles.emailUser} variant="subtitle2">
            alexiscarreras@hotmail.com
          </Typography>
        </div>
        <Divider className={styles.divider} />
        <Link to="/account">
          <MenuItem
            className={styles.itemIcon}
            onClick={handleClose}
          >
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
