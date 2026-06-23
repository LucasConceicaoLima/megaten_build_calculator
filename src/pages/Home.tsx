import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuPrincipal = [
    { label: "Player", path: "/player", icon: <InboxIcon /> },
    { label: "Demon", path: "/demon", icon: <MailIcon /> },
    { label: "Expertises", path: "/expertises", icon: <InboxIcon /> },
    { label: "Chain Expertises", path: "/chain-expertises", icon: <MailIcon /> },
  ];

  const menuResultados = [
    { label: "Party", path: "/party", icon: <InboxIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            MegaTen Build Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />

        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuPrincipal.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            {menuResultados.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
