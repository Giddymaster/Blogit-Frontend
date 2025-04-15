import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import apiUrl from "../utils/apiUrl";

const fetchBlogs = async () => {
  const res = await axios.get(`${apiUrl}/blogs`);
  return res.data.blogs;
};

const deleteBlog = async (id) => {
  await axios.delete(`${apiUrl}/blogs/${id}`);
};

function Blogs(){
  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const mutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return <div>Loading blogs...</div>;

  return (
    <Grid container spacing={2}>
      {blogs.map((blog) => (
        <Grid item xs={12} md={6} key={blog.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{blog.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {blog.excerpt}
              </Typography>
              <Link to={`/blogs/${blog.id}`}>
                <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                  Read More
                </Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(blog.id)}
                sx={{ mt: 1, ml: 1 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blogs;
