import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "../store/useStore";
import apiUrl from "../utils/apiUrl";

function Login() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUserInformation = useUserStore((state) => state.setUserInformation);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/blogs");
    }
  }, [user, navigate]);

  const {isPending, mutate} = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${apiUrl}/login`, {
        identifier,
        password,
      }
      ,
      {
        withCredentials: true,
      }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.user) {
        setUserInformation(data.user);
        navigate("/blogs");
      } else {
        setError(data.message || "Wrong emailAddress or password");
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error  )) {
        const message = error.response.data.message || "Login failed";
        setError(message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    },
  });

  function handleSubmit(e){
    e.preventDefault();
    setError("");
    mutate();
  };

  return (
    <Paper sx={{ width: "100vw" }}>
      <Navbar />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
        sx={{ backgroundColor: "#f9f9f9", py: 4 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login to Your Account
          </Typography>

          <TextField
            fullWidth
            label="username or email address"
            margin="normal"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isPending}
            sx={{ mt: 3, py: 1.5 }}
          >
            {isPending ? <CircularProgress size={24} /> : "Login"}
          </Button>

          <Typography textAlign="center" mt={2}>
            Don`t have an account?{" "}
          <Button component={Link} to="/signup" size="small">
            Sign Up
          </Button>
        </Typography>
        </Paper>
      </Box>
    </Paper>
  );
}

export default Login;
