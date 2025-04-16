import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../utils/apiUrl";
import Navbar from "../components/Navbar";

function WriteBlog() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !excerpt || !body) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/blogs/mine`, {
        title,
        excerpt,
        body,
      },
      {
        withCredentials: true,
      });

      if (res.status === 201) {
        navigate("/blogs"); 
      }
    } catch (error) {
      console.error("Error submitting post:", error);
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
        <form onSubmit={handleSubmit}>
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
            label="Blog Contents"
            placeholder="Write blog body here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            required
            margin="normal"
            multiline
            rows={6}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Publishing..." : "Publish"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default WriteBlog;
