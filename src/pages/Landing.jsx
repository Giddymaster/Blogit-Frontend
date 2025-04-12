import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Paper sx={{ width: "95vw" }}>
      <Navbar />

      <Container maxWidth="md" sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          Stay Curious.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Discover stories, thinking, and expertise from writers on any topic.
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/">
          Start Reading
        </Button>
      </Container>

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

export default Landing;
