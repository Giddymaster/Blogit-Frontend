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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../components/Navbar";

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
      const response = await axios.post(`http://localhost:4000/register`, {
        firstName,
        lastName,
        emailAddress,
        username,
        password,
      });
      return response.data;
    },

    onSuccess: (data) => {
      navigate("/login");
    },

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
    <Paper component="form" sx={{ padding: 2 }} onSubmit={handleSubmit}>
      <Navbar />
      <Typography variant="h2" component="h1" mb={2}>
        Welcome to BlogIt.
      </Typography>
      <Typography variant="h4" component="h1" mb={3}>
        Sign Up to read more Blogs and to Publish captivating stories.
      </Typography>
      <TextField
        id="firstName"
        label="First Name"
        variant="outlined"
        fullWidth
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        id="lastName"
        label="Last Name"
        variant="outlined"
        fullWidth
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id="emailAddress"
        label="Email Address"
        variant="outlined"
        fullWidth
        required
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        fullWidth
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide password" : "show password"}
                onClick={handleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
        <OutlinedInput
          id="confirm-password"
          type={showconfirmedPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showconfirmedPassword ? "hide password" : "show password"
                }
                onClick={handleshowconfirmedPassword}
              >
                {showconfirmedPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
      </FormControl>

      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}

      <Button variant="contained" fullWidth type="submit" disabled={isPending}>
        {isPending ? "Please wait ..." : "Sign Up"}
      </Button>
      <Typography variant="h5">
        Already have an Account?
        <Button component={Link} to="/login">
          Login
        </Button>
      </Typography>
    </Paper>
  );
}

export default SignUp;
