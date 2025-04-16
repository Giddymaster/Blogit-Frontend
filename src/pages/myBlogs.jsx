import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";
import apiUrl from "../utils/apiUrl";
import NavBar from "../components/Navbar";

function MyBlogs() {
  const queryClient = useQueryClient();
  const [fetchError, setFetchError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", excerpt: "" });

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["my-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/myn`, {
        withCredentials: true,
      });
      return response.data.blogs;
    },
  });

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data.message || "An error occurred";
        setFetchError(serverMessage);
      } else {
        setFetchError("Something went wrong. Please try again later.");
      }
    }
  }, [error]);

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${apiUrl}/blogs/${id}`, { withCredentials: true }),
    onSuccess: () => queryClient.invalidateQueries(["my-blogs"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updated }) =>
      axios.put(`${apiUrl}/blogs/${id}`, updated, {
        withCredentials: true,
      }),
    onSuccess: () => {
      setEditingId(null);
      setEditData({ title: "", excerpt: "" });
      queryClient.invalidateQueries(["my-blogs"]);
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
          Loading please wait...
        </Typography>
      </Box>
    );
  }

  if (isError) {
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
        <Button variant="contained" component={Link} to="/compose">
          Compose New Blog
        </Button>
      </Box>

      {data && data.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <Typography variant="h4" gutterBottom>
            You haven’t written any blogs yet.
          </Typography>
        </Box>
      ) : (
        <Grid container alignItems="center" direction="column" mt={6} spacing={3}>
          {data.map((blog) => (
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
