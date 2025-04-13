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
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Add New User</Typography>
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
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : 'Add User'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddUser;
