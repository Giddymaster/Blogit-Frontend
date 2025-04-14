import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import useUserStore from "../store/useStore";
import { useState } from "react";

function Navbar() {
  const user = useUserStore((state) => state.user);
  const removeUserInformation = useUserStore(
    (state) => state.removeUserInformation,
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    removeUserInformation();
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #eee",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
          <Box display="flex" alignItems="center">
            <img
              src={logo}
              alt="logo"
              style={{ width: "180px", height: "auto" }}
            />
          </Box>

          {!user ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  px: 1,
                }}
              >
                <SearchIcon />
                <InputBase placeholder="Search…" sx={{ ml: 1 }} />
              </Box> */}

              <Button
                variant="outlined"
                sx={{ borderColor: "black", color: "black" }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/signup"
                sx={{ borderColor: "black", color: "black" }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 4,
                  justifyContent: "center",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="button"
                  component={Link}
                  to="/read"
                  sx={{ cursor: "pointer" }}
                >
                  Read
                </Typography>
                <Typography
                  variant="button"
                  component={Link}
                  to="/publish"
                  sx={{ cursor: "pointer" }}
                >
                  Publish
                </Typography>
                <Typography
                  variant="button"
                  component={Link}
                  to="/blogs"
                  sx={{ cursor: "pointer" }}
                >
                  Blogs
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    px: 1,
                  }}
                >
                  <SearchIcon />
                  <InputBase placeholder="Search…" sx={{ ml: 1 }} />
                </Box>

                <IconButton onClick={handleMenuOpen}>
                  <Avatar>{user.firstName?.charAt(0)}</Avatar>
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem disabled>Hello, {user.firstName}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
