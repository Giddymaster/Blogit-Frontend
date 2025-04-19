import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Delete, Edit, Save, Cancel, Article } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "../utils/apiUrl";
import Navbar from "../components/Navbar";
import useBlogsStore from "../store/useBlogsStore";

function MyBlogs() {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    excerpt: "",
    body: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { myBlogs, setMyBlogs, removeBlog, refreshMyBlogs } = useBlogsStore();

  const { isLoading, error } = useQuery({
    queryKey: ["myBlogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/mine`, {
        withCredentials: true,
      });
      setMyBlogs(response.data.blogs);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${apiUrl}/blogs/${id}`, { withCredentials: true }),
    onSuccess: (_, id) => {
      removeBlog(id);
      showSnackbar("Blog deleted successfully", "success");
    },
    onError: () => {
      showSnackbar("Failed to delete blog", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updated }) =>
      axios.patch(`${apiUrl}/blogs/${id}`, updated, {
        withCredentials: true,
      }),
    onSuccess: () => {
      refreshMyBlogs();
      showSnackbar("Blog updated successfully", "success");
      setEditingId(null);
    },
    onError: () => {
      showSnackbar("Failed to update blog", "error");
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setEditData({
      title: blog.title,
      excerpt: blog.excerpt,
      body: blog.body,
    });
  };

  const handleSave = (id) => {
    if (!editData.title || !editData.excerpt || !editData.body) {
      showSnackbar("All fields are required", "error");
      return;
    }
    updateMutation.mutate({ id, updated: editData });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ title: "", excerpt: "", body: "" });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error.message}
      </Alert>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            My Blog Posts
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/writeblog"
            startIcon={<Article />}
          >
            Create New Blog
          </Button>
        </Box>

        {myBlogs.length === 0 ? (
          <Box textAlign="center" mt={6}>
            <Typography variant="h5" gutterBottom>
              You haven`t published any blogs yet
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to="/writeblog"
              sx={{ mt: 2 }}
            >
              Start Writing
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {myBlogs.map((blog) => (
              <Grid item xs={12} md={6} key={blog.id}>
                <Card>
                  <CardContent>
                    {editingId === blog.id ? (
                      <>
                        <TextField
                          label="Title"
                          fullWidth
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="Excerpt"
                          fullWidth
                          multiline
                          rows={2}
                          value={editData.excerpt}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              excerpt: e.target.value,
                            })
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="Content"
                          fullWidth
                          multiline
                          rows={4}
                          value={editData.body}
                          onChange={(e) =>
                            setEditData({ ...editData, body: e.target.value })
                          }
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" gutterBottom>
                          {blog.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {blog.excerpt}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                          {blog.body.substring(0, 150)}...
                        </Typography>
                      </>
                    )}
                  </CardContent>
                  <CardActions>
                    {editingId === blog.id ? (
                      <>
                        <Button
                          size="small"
                          startIcon={<Save />}
                          onClick={() => handleSave(blog.id)}
                          disabled={updateMutation.isLoading}
                        >
                          Save
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Cancel />}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="small"
                          startIcon={<Edit />}
                          onClick={() => handleEdit(blog)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Delete />}
                          onClick={() => deleteMutation.mutate(blog.id)}
                          disabled={deleteMutation.isLoading}
                          color="error"
                        >
                          Delete
                        </Button>
                        <Box flexGrow={1} />
                        <Button
                          size="small"
                          onClick={() => navigate(`/blogs/${blog.id}`)}
                        >
                          View
                        </Button>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MyBlogs;
