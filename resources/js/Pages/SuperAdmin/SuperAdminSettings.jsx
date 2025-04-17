import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem, CircularProgress
} from '@mui/material';

import { auth, db, storage } from '../../firebase'; // ✅ correct path
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref as dbRef, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddUser = () => {
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
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const uid = userCredential.user.uid;

      // 2. Upload photo if selected
      let photoURL = '';
      if (formData.photo) {
        const path = `avatars/${uid}/${formData.photo.name}`;
        const imageRef = storageRef(storage, path);
        await uploadBytes(imageRef, formData.photo);
        photoURL = await getDownloadURL(imageRef);
      }

      // 3. Save user to Realtime Database
      const userRef = dbRef(db, `users/${uid}`);
      await set(userRef, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        photoURL,
      });

      alert('✅ User successfully added!');
      setFormData({ name: '', email: '', password: '', role: '', photo: null });
      setPreview('');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add user: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 6,
        p: 4,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="subtitle1" fontWeight="bold" color="#450001" sx={{ mb: 1 }}>
          Name
        </Typography>
        <TextField
          fullWidth placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="dense"
        />

        <Typography variant="subtitle1" fontWeight="bold" color="#450001" sx={{ mt: 2, mb: 1 }}>
          Email
        </Typography>
        <TextField
          fullWidth placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="dense"
        />

        <Typography variant="subtitle1" fontWeight="bold" color="#450001" sx={{ mt: 2, mb: 1 }}>
          Password
        </Typography>
        <TextField
          fullWidth placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="dense"
        />

        <Typography variant="subtitle1" fontWeight="bold" color="#450001" sx={{ mt: 2, mb: 1 }}>
          Role
        </Typography>
        <TextField
          fullWidth select name="role"
          value={formData.role}
          onChange={handleChange}
          margin="dense"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </TextField>

        <Typography variant="subtitle1" fontWeight="bold" color="#450001" sx={{ mt: 2, mb: 1 }}>
          Profile Picture
        </Typography>
        <Button variant="contained" component="label" sx={{ mb: 1 }}>
          Upload Image
          <input type="file" hidden name="photo" accept="image/*" onChange={handleChange} />
        </Button>

        {preview && (
          <Box mt={1}>
            <img src={preview} alt="Preview" style={{ width: 100, height: 100, borderRadius: '50%' }} />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 4,
            bgcolor: '#8E0000',
            '&:hover': { backgroundColor: '#660200' },
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Save User'}
        </Button>
      </form>
    </Box>
  );
};

export default AddUser;
