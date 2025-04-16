import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NavBar from "../components/Navbar";
import { apiUrl } from "../utils/apiUrl";

function Blogs() {
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["my-blogs"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs/mine`, {
        withCredentials: true,
      });
      return response.data.blogs;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${apiUrl}/blogs/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-blogs"]);
    },
  });

  useEffect(() => {
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error?.response?.data?.message || "An error occurred";
      setFetchError(serverMessage);
    } else {
      setFetchError("Something went wrong. Please try again later.");
    }
  }, [error]);

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
        <Typography variant="h6" sx={{ marginLeft: 2 }}>
          Loading please wait...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h2" fontWeight={400} mt={10} textAlign="center">
        {fetchError}
      </Typography>
    );
  }

  return (
    <>
      <NavBar />

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} px={3}>
        <Typography variant="h4">My Blogs</Typography>
        <Button variant="contained" onClick={() => navigate("/writeblog")}>Create New Blog</Button>
      </Box>

      {data && data.length === 0 && (
        <Box textAlign="center" mt={6}>
          <Typography
            variant="h5"
            fontWeight={500}
            gutterBottom
          >
            No blog content yet.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/writeblog")}>Create New Blog</Button>
        </Box>
      )}

      <Grid container spacing={3} mt={4} px={3}>
        {data && data.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" mt={1}>{item.excerpt}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/edit/${item.id}`)}>Edit</Button>
                <Button size="small" color="error" onClick={() => deleteMutation.mutate(item.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Blogs;
