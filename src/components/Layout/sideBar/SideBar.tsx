import { Box, Drawer, Typography } from "@mui/material";
import { SideBarProps } from "./type";
import styles from "./styles.module.css";
import "./stylesMUI.css";

import { DrawerList } from "../drawer/DrawerList";

export const SideBar: React.FunctionComponent<SideBarProps> = ({
  drawerWidth,
  mobileOpen,
  setMobileOpen,
  setIsClosing,
}) => {
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        className={styles.drawer}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none", backgroundColor: "#121621" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerList />
        <Typography variant="caption" className={styles.version}>
          Version 1.0.0
        </Typography>
      </Drawer>
      <Drawer
        className={styles.drawer}
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawerList />
        <Typography variant="caption" className={styles.version}>
          Version 1.0.0
        </Typography>
      </Drawer>
    </Box>
  );
};
