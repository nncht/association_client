import * as React from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

// MUI components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "@mui/material/Link";

// MUI icons
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

// -- End of Imports

type Anchor = "left";

export default function NavBar() {
  // Determine login state
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // Drawer navigation
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* Home */}
        <ListItem key="Home" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link href="/profile" underline="none">
              <ListItemText primary="Home" />
            </Link>
          </ListItemButton>
        </ListItem>

        {/* Profile */}
        <ListItem key="Profile" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link href="/profile" underline="none">
              <ListItemText primary="Profile" />
            </Link>
          </ListItemButton>
        </ListItem>

        {/* Notifications */}
        <ListItem key="Notifications" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link href="#" underline="none">
              <ListItemText primary="Notifications" />
            </Link>
          </ListItemButton>
        </ListItem>

        {/* Messages */}
        <ListItem key="Messages" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link href="#" underline="none">
              <ListItemText primary="Messages" />
            </Link>
          </ListItemButton>
        </ListItem>

        {/* Bookmarks */}
        <ListItem key="Bookmarks" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link href="#" underline="none">
              <ListItemText primary="Bookmarks" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      {/* Settings */}
      <ListItem key="Settings" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <Link href="/profile" underline="none">
            <ListItemText primary="Settings" />
          </Link>
        </ListItemButton>
      </ListItem>
      <Divider />

      {/* New Item */}
      <ListItem key="New Item" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <Link href="/create-item" underline="none">
            <ListItemText primary="Create Item" />
          </Link>
        </ListItemButton>
      </ListItem>
    </Box>
  );

  {
    /* <IconButton color="primary" variant="text" onClick={logOutUser}>
                <LogoutIcon className="text-slate-50" />
              </IconButton> */
  }

  return (
    <nav className="sticky shadow top-0 bg-slate-700" style={{ zIndex: 10 }}>
      {/* BRAND LOGO */}
      <div id="nav-bar" className="flex items-center justify-between pl-6">
        <Link href="/" underline="none" className="flex items-center">
          <h1 className="w-full text-3xl tracking-widest font-bold my-2 text-slate-50">
            /USEUM
          </h1>
        </Link>

        {/* LOGGED OUT NAVBAR */}
        {!isLoggedIn && (
          <div className="flex items-center">
            <Link href="/login" className="mx-2">
              <Button sx={{ color: "white" }} variant="text" size="small">
                Log In
              </Button>
            </Link>

            <Link href="/signup">
              <Button variant="contained" size="small">
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        {/* LOGGED IN NAVBAR */}
        {isLoggedIn && (
          <div>
            <div>
              <Link href="/profile">
                <IconButton color="primary" variant="text">
                  <AccountCircleIcon className="text-slate-50" />
                </IconButton>
              </Link>

              {/* Burger menu */}
              <React.Fragment key="left">
                <Button onClick={toggleDrawer("left", true)}>
                  <MenuIcon className="text-slate-50" />
                </Button>
                <Drawer
                  anchor="left"
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  {list("left")}
                </Drawer>
              </React.Fragment>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
