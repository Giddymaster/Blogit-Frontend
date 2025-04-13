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
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      <Navbar />
      <Typography variant="h4" component="h1" textAlign="center" mb={1}>
        Welcome to BlogIt.
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={3}>
        Sign up to read more blogs and publish captivating stories.
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width={600}
      >
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          required
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <TextField
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
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
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
  );
}

export default SignUp;
