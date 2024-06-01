import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.custom.white,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Stack direction="row" sx={{ ml: 4, mt: 4 }}>
        <Stack
          sx={{
            ":hover": { cursor: "pointer" },
          }}
        >
          <Image
            src="/icon/arrow-sidebar.svg"
            alt="arrow-icon"
            width={18}
            height={18}
            onClick={toggleDrawer(false)}
          />
        </Stack>
      </Stack>
      <Box sx={{ marginTop: 5 }}>
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Stack direction="row" sx={{ ml: 3.5, mt: 2 }}>
            <Stack>
              <Image
                src="/icon/home-sidebar.svg"
                alt="home-icon"
                width={24}
                height={24}
              />
            </Stack>
            <Typography
              sx={{
                ml: 1.5,
                fontWeight: 500,
                color: theme.palette.custom.white,
              }}
            >
              Home
            </Typography>
          </Stack>
        </Link>
        <Link href="our-blog" passHref style={{ textDecoration: "none" }}>
          <Stack direction="row" sx={{ ml: 3.5, mt: 2 }}>
            <Stack>
              <Image
                src="/icon/edit-sidebar.svg"
                alt="edit-icon"
                width={24}
                height={24}
              />
            </Stack>
            <Typography
              sx={{
                ml: 1.5,
                fontWeight: 500,
                color: theme.palette.custom.white,
              }}
            >
              Our Blog
            </Typography>
          </Stack>
        </Link>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Castoro, serif",
              fontStyle: "italic",
              flexGrow: 1,
            }}
          >
            a Board
          </Typography>

          {isMdUp ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{ fontSize: 40 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              onClick={toggleDrawer(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
