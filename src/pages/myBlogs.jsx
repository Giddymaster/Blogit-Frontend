import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";
import apiUrl from "../utils/apiUrl";
import NavBar from "../components/Navbar";
import useBlogsStore from "../store/useBlogsStore";

function MyBlogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", excerpt: "" });

  const myBlogs = useBlogsStore((state) => state.myBlogs);
  const setMyBlogs = useBlogsStore((state) => state.setMyBlogs);
  const removeBlog = useBlogsStore((state) => state.removeBlog);

  const fetchMyBlogs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/blogs/myn`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setMyBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching my blogs:", error);
      setFetchError("Failed to load your blogs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${apiUrl}/blogs/myn/${id}`, { withCredentials: true }),
    onSuccess: (_, id) => {
      removeBlog(id);
    },
    onError: () => {
      alert("Failed to delete blog. Please try again.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updated }) =>
      axios.put(`${apiUrl}/blogs/myn/${id}`, updated, {
        withCredentials: true,
      }),
    onSuccess: () => {
      fetchMyBlogs();
      setEditingId(null);
      setEditData({ title: "", excerpt: "" });
    },
    onError: () => {
      alert("Failed to update blog. Please try again.");
    },
  });

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setEditData({ title: blog.title, excerpt: blog.excerpt });
  };

  const handleSave = (id) => {
    updateMutation.mutate({ id, updated: editData });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ title: "", excerpt: "" });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading your blogs...
        </Typography>
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Typography variant="h5" mt={10} textAlign="center" color="error">
        {fetchError}
      </Typography>
    );
  }

  return (
    <>
      <NavBar />
      <Box textAlign="center" mt={4}>
        <Button variant="contained" component={Link} to="/blogs/myn">
          Write New Blog
        </Button>
      </Box>

      {myBlogs.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <Typography variant="h4" gutterBottom>
            You haven’t written any blogs yet.
          </Typography>
        </Box>
      ) : (
        <Grid container alignItems="center" direction="column" mt={6} spacing={3}>
          {myBlogs.map((blog) => (
            <Grid
              item
              xs={11}
              md={8}
              lg={6}
              key={blog.id}
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              {editingId === blog.id ? (
                <>
                  <TextField
                    label="Title"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                  <TextField
                    label="Excerpt"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    value={editData.excerpt}
                    onChange={(e) =>
                      setEditData({ ...editData, excerpt: e.target.value })
                    }
                  />
                  <Box display="flex" gap={1}>
                    <IconButton color="success" onClick={() => handleSave(blog.id)}>
                      <Save />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleCancel}>
                      <Cancel />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                    {blog.excerpt}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <IconButton color="primary" onClick={() => handleEdit(blog)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteMutation.mutate(blog.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default MyBlogs;
