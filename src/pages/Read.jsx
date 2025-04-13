import { Typography, Button, Container, Paper, ButtonGroup } from "@mui/material";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import bgImg from "../assets/bg.jpeg";

function Blogs() {
  return (
    <Paper
    sx={{
      width: "100vw",
      minHeight: "100vh",
      backgroundImage: `url(${bgImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      color: "#fff", 
    }}
    >
      <Navbar />

      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Trending on BlogIt
        </Typography>

        

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2">Author Name</Typography>
          <Typography variant="h6">Sample Blog Post </Typography>
          <Typography variant="body2" color="text.secondary">
            5 min read
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2">Author Name</Typography>
          <Typography variant="h6">Sample Blog Post </Typography>
          <Typography variant="body2" color="text.secondary">
            5 min read
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2">Author Name</Typography>
          <Typography variant="h6">Sample Blog Post </Typography>
          <Typography variant="body2" color="text.secondary">
            5 min read
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2">Author Name</Typography>
          <Typography variant="h6">Sample Blog Post </Typography>
          <Typography variant="body2" color="text.secondary">
            5 min read
          </Typography>
        </Paper>
      </Container>
    </Paper>
  );
}

export default Blogs;
