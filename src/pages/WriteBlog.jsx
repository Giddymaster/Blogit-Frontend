import { Box, Button, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../utils/apiUrl";
import Navbar from "../components/Navbar";
import useBlogsStore from "../store/useBlogsStore";

function WriteBlog() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addBlog, refreshBlogs } = useBlogsStore();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !excerpt || !body) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/blogs`, {
        title,
        excerpt,
        body,
        featuredImage: featuredImage || "https://via.placeholder.com/600x400",
      }, {
        withCredentials: true,
      });

      if (res.status === 201) {
        addBlog(res.data.blog);
        await refreshBlogs(); 
        navigate("/blogs", { state: { success: "Blog published successfully!" } });
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setError(error.response?.data?.message || "Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Write a New Blog
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{ mb: 2 }}
          />

          <TextField
            label="Excerpt"
            placeholder="A short preview of your blog..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            fullWidth
            required
            margin="normal"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Featured Image URL (optional)"
            placeholder="Paste an image URL here"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
          />

          <TextField
            label="Blog Content"
            placeholder="Write your blog content here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            required
            margin="normal"
            multiline
            rows={10}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Publishing..." : "Publish"}
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default WriteBlog;