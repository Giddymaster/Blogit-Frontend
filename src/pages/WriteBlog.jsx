
import {
  Box, Button, TextField, Typography, InputLabel, FormControl,
} from "@mui/material";
import axios from "axios";
import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../utils/apiUrl";

function Write() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !excerpt || !body || !featuredImage) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("body", body);
    formData.append("image", featuredImage);

    try {
      const res = await axios.post(`${apiUrl}/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 201) {
        navigate(`/posts/${res.data.id}`);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Featured Image</InputLabel>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </FormControl>

        <TextField
          label="Title"
          placeholder="Enter your title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Excerpt"
          placeholder="Enter excerpt here..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
        />

<TextField
          label="Excerpt"
          placeholder="Write Blog body here"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
        />

        <Button variant="contained" color="primary" type="submit">
          Publish
        </Button>
      </form>
    </Box>
  );
};

export default Write;
