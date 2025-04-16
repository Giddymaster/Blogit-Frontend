import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Container,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';
import apiUrl from '../utils/apiUrl';
import useUserStore from '../store/useStore';

function Profile() {
  const user = useUserStore((state) => state.user);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        username: user.username || '',
      });
    }
  }, [user]);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const updatePersonalInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${apiUrl}/users/me/personal`, personalInfo);
      alert('Personal information updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating personal info.');
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    try {
      await axios.put(`${apiUrl}/users/me/password`, {
        currentPassword: passwordInfo.currentPassword,
        newPassword: passwordInfo.newPassword,
      });
      alert('Password updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Password update failed.');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box mt={4} mb={4}>
          <Typography variant="h5" gutterBottom>
            My Profile
          </Typography>

          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <form onSubmit={updatePersonalInfo}>
            <TextField
              label="First Name"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Username"
              name="username"
              value={personalInfo.username}
              onChange={handlePersonalInfoChange}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              Update your profile Info
            </Button>
          </form>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={updatePassword}>
            <TextField
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordInfo.currentPassword}
              onChange={handlePasswordChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordInfo.newPassword}
              onChange={handlePasswordChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordInfo.confirmPassword}
              onChange={handlePasswordChange}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Change Password
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
