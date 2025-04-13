import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem, CircularProgress, Tabs, Tab, Breadcrumbs, Paper, Link
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockResetIcon from '@mui/icons-material/LockReset';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useNavigate, useLocation } from 'react-router-dom';

import { auth, db, storage } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref as dbRef, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    if (location.pathname.includes('manage-users')) return 0;
    if (location.pathname.includes('add-user')) return 1;
    if (location.pathname.includes('account-recovery')) return 2;
    return 0;
  };

  const [tabValue, setTabValue] = useState(getCurrentTab());
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/super_admin/manage-users');
    if (newValue === 1) navigate('/super_admin/add-user');
    if (newValue === 2) navigate('/super_admin/account-recovery');
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const uid = userCredential.user.uid;

      let photoURL = '';
      if (formData.photo) {
        const storagePath = `avatars/${uid}/${formData.photo.name}`;
        const imageRef = storageRef(storage, storagePath);
        await uploadBytes(imageRef, formData.photo);
        photoURL = await getDownloadURL(imageRef);
      }

      const userRef = dbRef(db, `users/${uid}`);
      await set(userRef, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        photoURL,
      });

      alert('✅ User added successfully!');
      setFormData({ name: '', email: '', password: '', role: '', photo: null });
      setPreview('');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to add user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar Tabs */}
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

      {/* Content Area */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">User Management</Link>
          <Typography color="text.primary">Add User</Typography>
        </Breadcrumbs>

        <Paper elevation={2} sx={{ maxWidth: 500, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="#450001" mb={2}>Add New User</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />
            <TextField fullWidth select label="Role" name="role" value={formData.role} onChange={handleChange} margin="normal" required>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </TextField>

            <Box mt={2}>
              <Button variant="contained" component="label">
                Upload Photo
                <input type="file" name="photo" hidden accept="image/*" onChange={handleChange} />
              </Button>
            </Box>

            {preview && (
              <Box mt={2}>
                <img src={preview} alt="Preview" style={{ width: 100, height: 100, borderRadius: '50%' }} />
              </Box>
            )}

            <Box mt={3}>
              <Button type="submit" variant="contained" sx={{
                bgcolor: '#8E0000',
                '&:hover': { backgroundColor: '#660200' },
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem'
              }} disabled={loading} fullWidth>
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Add User'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddUser;
