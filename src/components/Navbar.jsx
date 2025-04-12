import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
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

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="button" sx={{ cursor: "pointer" }} component={Link} to="/login">
              Read
            </Typography>
            <Typography variant="button" sx={{ cursor: "pointer" }} component={Link} to="/login" >
              Publish
            </Typography>
            <Typography variant="button" sx={{ cursor: "pointer" }} component={Link} to="/login">
              Blogs
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" component={Link} to="/login">
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
