import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      navigate("/landing");
    } else {
      setError("Invalid username or password");
    }
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
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            sx={{ mt: 3, py: 1.5 }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Paper>
  );
}

export default Login;
