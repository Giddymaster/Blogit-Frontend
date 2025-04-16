import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../utils/apiUrl';

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setBlogs(data.blogs);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', py: 4, px: 2 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: 600, color: '#333' }}
      >
        Discover Inspiring Stories
      </Typography>

      {loading ? (
        <Typography align="center">Loading blogs...</Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {blogs.map((blog) => (
            <Grid item xs={12} md={9} key={blog.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#ffffff',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 4,
                  height: 300,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                }}
              >
                <Box
                  sx={{
                    flex: 2,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 'bold', color: '#2c3e50' }}
                      gutterBottom
                    >
                      {blog.title}
                    </Typography>

                    <Box
                      sx={{
                        maxHeight: 120,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        color: 'text.secondary',
                        fontSize: 14,
                      }}
                    >
                      {blog.excerpt}
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar src={blog.author.avatar || ''} sx={{ mr: 1 }}>
                        {!blog.author.avatar && blog.author.username[0]?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {blog.author.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Updated on {new Date(blog.updatedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/blogs/${blog.id}`)}
                      sx={{ textTransform: 'none', backgroundColor: '#1976d2' }}
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>

                <CardMedia
                  component="img"
                  image={blog.featuredImage}
                  alt={blog.title}
                  sx={{
                    width: '40%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Card>

              <Box
                sx={{
                  mt: 1,
                  px: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  color: 'text.secondary',
                  fontSize: 14,
                  maxWidth: '75%',
                  mx: 'auto',
                }}
              >
                {blog.excerpt.length > 200 ? blog.excerpt.slice(200) : ''}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
