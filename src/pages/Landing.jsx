import { Typography, Button, Container, Paper, ButtonGroup } from "@mui/material";
import Navbar from "../components/Navbar";
import bgImg from "../assets/bgimg.jpg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Paper
    sx={{
      width: "100vw",
      minHeight: "100vh",
      backgroundImage: `url(${bgImg})`,
      backgroundSize: "cover",
      backgroundPosition: "top",
      backgroundRepeat: "no-repeat",
      position: "relative",
    }}
    >
      <Navbar />

      <Container maxWidth="md" sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h1" gutterBottom color="white">
          Create, collaborate, and scale your blogs and docs.
        </Typography>
        <Typography variant="h4" gutterBottom color="white">
          Discover stories, thinking, and expertise from writers on any topic.
        </Typography>
        <ButtonGroup variant="text" aria-label="Large button group" sx={{ marginTop: 5,marginBottom: 5, marginLeft: 3, background: "white" }} component={Link} to= "/signup">
          <Button sx={{ px: 4, py: 2, fontSize: "1.2rem", fontWeight: 600, color:"rgba(212, 51, 14, 0.7)"}}>Star Writing</Button>
          <Button sx={{ px: 4, py: 2, fontSize: "1.2rem", fontWeight: 600, color:"rgba(212, 51, 14, 0.7)" }}>Explore stories</Button>
        </ButtonGroup>

      </Container>
    </Paper>
  );
}

export default Landing;
