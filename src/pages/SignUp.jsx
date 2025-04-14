import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Alert,
  Paper,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../components/Navbar";
import apiUrl from "../utils/apiUrl";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmedPassword, setshowconfirmedPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleshowconfirmedPassword = () =>
    setshowconfirmedPassword((show) => !show);

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/register`, {
        firstName,
        lastName,
        emailAddress,
        username,
        password,
      });
      return response.data;
    },
    onSuccess: () => navigate("/login"),
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response.data.message;
        setError(serverMessage);
      } else {
        setError("Something went wrong!");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    mutate();
  };

  return (
    <Box sx={{ width: "100vw", bgcolor: "#f5f5f5" }}>
    <Container >
    <Navbar />
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "#fff",
      }}
    >
      <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            Join BlogIt Today
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={1}>
          Sign up to read more blogs and publish captivating stories.
          </Typography>
      </Box>
      
      <Box>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirm-password"
            type={showconfirmedPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleshowconfirmedPassword} edge="end">
                  {showconfirmedPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            required
          />
        </FormControl>

        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isPending}
          sx={{ py: 1.5, mt: 1 }}
        >
          {isPending ? "Please wait ..." : "Sign Up"}
        </Button>

        <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
          <Button component={Link} to="/login" size="small">
            Login
          </Button>
        </Typography>
      </Box>
    </Paper>
    </Container>
    </Box>
  );
}

export default SignUp;
