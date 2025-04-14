import {
  Container,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";

function Blogs() {
  
  return (
    <>
    <Navbar/>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Discover Stories
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Explore the latest articles from our community of writers
      </Typography>
    </Container>
    </>
  );

}
export default Blogs;