import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiUrl from "../utils/apiUrl"; 

function Blogs(){
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/blogs`);
        setBlogs(res.data.blogs);
      } catch (e) {
        console.log(e, "Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Blogs
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card>
              {blog.featuredImage && (
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.featuredImage}
                  alt={blog.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component={Link} to={`/posts/${blog.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.excerpt.slice(0, 100)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
