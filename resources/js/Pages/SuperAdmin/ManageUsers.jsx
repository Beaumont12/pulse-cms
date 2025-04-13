import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link,
  TextField, MenuItem, Button, CircularProgress, Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockResetIcon from '@mui/icons-material/LockReset';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { auth, db, storage } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref as dbRef, set, onValue } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ManageUsers() {
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['Manage User', 'Add User', 'Password Resets & Account Recovery'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: '', photo: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const handleAddUserChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Creating user with email:', formData.email);
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const uid = userCredential.user.uid;
      console.log('User created with UID:', uid);

      let photoURL = '';
      if (formData.photo) {
        const imageRef = storageRef(storage, `avatars/${uid}/${formData.photo.name}`);
        console.log('Uploading photo to storage...');
        await uploadBytes(imageRef, formData.photo);
        photoURL = await getDownloadURL(imageRef);
        console.log('Photo uploaded, URL:', photoURL);
      }

      const userRef = dbRef(db, `users/${uid}`);
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        photoURL,
      };
      console.log('Saving user data to Realtime Database:', userData);
      await set(userRef, userData);

      const debugRef = dbRef(db, `debug_test/${Date.now()}`);
      await set(debugRef, { message: "Test write success" });
      console.log('✅ Test debug write successful.');

      alert('✅ User added successfully!');
      setFormData({ name: '', email: '', password: '', role: '', photo: null });
      setPreview('');
    } catch (error) {
      console.error('❌ Error adding user:', error);
      alert('❌ Failed to add user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const usersRef = dbRef(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedUsers = Object.entries(data).map(([uid, userData]) => ({ uid, ...userData }));
        setUsers(loadedUsers);
      } else {
        setUsers([]);
      }
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <Box sx={{ width: 280, backgroundColor: '#fff', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', py: 1 }}>
        <Box sx={{ mb: 2, mt: 1, p: 2 }}>
          <Typography variant="h6" fontWeight="semi-bold" color="#450001">User Management</Typography>
          <Typography variant="caption" color="text.secondary">Manage users, roles and access</Typography>
        </Box>
        <Tabs value={tabValue} onChange={handleTabChange} orientation="vertical" variant="scrollable" scrollButtons="auto" sx={{
          '& .MuiTab-root': {
            justifyContent: 'flex-start', gap: 1.5, px: 2, py: 1.2, m: 0.1, alignItems: 'center', color: '#450001', fontWeight: 500, textTransform: 'none', fontSize: '0.99rem', borderRadius: 2,
          },
          '& .Mui-selected': { bgcolor: '#F5F5F5', color: '#8E0000', fontWeight: 'semi-bold' },
          '& .MuiTab-wrapper': { flexDirection: 'row', justifyContent: 'flex-start', textAlign: 'left' },
        }}>
          <Tab icon={<PersonIcon fontSize="small" />} iconPosition="start" label="Manage User" />
          <Tab icon={<PersonAddIcon fontSize="small" />} iconPosition="start" label="Add User" />
          <Tab icon={<LockResetIcon fontSize="small" />} iconPosition="start" label="Account Recovery" />
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">User Management</Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>
        {tabValue === 0 && (
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.uid}>
                <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={user.photoURL} alt={user.name} sx={{ width: 56, height: 56 }} />
                  <Box>
                    <Typography fontWeight="bold">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    <Typography variant="caption" color="#8E0000">{user.role}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        {tabValue === 1 && (
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, maxWidth: 500 }}>
            <Typography fontWeight="bold" color="#450001" mb={2}>Add New User</Typography>
            <form onSubmit={handleAddUserSubmit}>
              <TextField fullWidth name="name" label="Full Name" value={formData.name} onChange={handleAddUserChange} margin="dense" />
              <TextField fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleAddUserChange} margin="dense" />
              <TextField fullWidth name="password" label="Password" type="password" value={formData.password} onChange={handleAddUserChange} margin="dense" />
              <TextField fullWidth select name="role" label="Role" value={formData.role} onChange={handleAddUserChange} margin="dense">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="super_admin">Super Admin</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </TextField>
              <Box mt={2} mb={1}>
                <Button variant="contained" component="label">
                  Upload Photo
                  <input type="file" name="photo" hidden accept="image/*" onChange={handleAddUserChange} />
                </Button>
              </Box>
              {preview && (
                <Box mt={1} mb={2}>
                  <img src={preview} alt="Preview" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                </Box>
              )}
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{
                bgcolor: '#8E0000',
                '&:hover': { backgroundColor: '#660200' },
                textTransform: 'none', fontWeight: 'bold', fontSize: '1rem', mt: 2,
              }}>
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Save User'}
              </Button>
            </form>
          </Paper>
        )}
        {tabValue === 2 && (
          <Typography color="text.secondary">[Password Reset Placeholder]</Typography>
        )}
      </Box>
    </Box>
  );
}
