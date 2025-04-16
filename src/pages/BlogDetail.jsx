import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  CardMedia,
} from '@mui/material';
import apiUrl from '../utils/apiUrl';
import Navbar from '../components/Navbar';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${apiUrl}/blogs/${id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setBlog(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">Blog not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', px: 3, py: 4 }}>
      <Navbar />
      <Typography variant="h3" gutterBottom>
        {blog.title}
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={blog.author?.avatar || ''} sx={{ mr: 1 }}>
          {!blog.author?.avatar && blog.author?.username[0]?.toUpperCase()}
        </Avatar>
        <Typography variant="subtitle2">{blog.author?.username}</Typography>
      </Box>
      <CardMedia
        component="img"
        image={blog.featuredImage}
        alt={blog.title}
        sx={{ maxHeight: 400, width: '100%', objectFit: 'cover', borderRadius: 2 }}
      />
      <Typography
        variant="body1"
        sx={{ mt: 3, whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}
      >
        {blog.body}
      </Typography>
    </Box>
  );
}
