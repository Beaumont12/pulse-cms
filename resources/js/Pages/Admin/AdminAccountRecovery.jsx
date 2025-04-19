import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Avatar, Button, Grid, Tabs, Tab, Breadcrumbs, Link
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockResetIcon from '@mui/icons-material/LockReset';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import { db } from '../../firebase';
import { onValue, ref as dbRef } from 'firebase/database';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminAccountRecovery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getCurrentTab = () => {
    if (location.pathname.includes('AdminManageUsers')) return 0;
    if (location.pathname.includes('AdminAddUser')) return 1;
    if (location.pathname.includes('AdminAccountRecovery')) return 2;
    return 0;
  };
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/admin/AdminManageUsers');
    if (newValue === 1) navigate('/admin/AdminAddUser');
    if (newValue === 2) navigate('/admin/AdminAccountRecovery'); // ✅ fixed
  };
  
  const [tabValue, setTabValue] = useState(getCurrentTab());
  

  useEffect(() => {
    const usersRef = dbRef(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data).map(([uid, user]) => ({ uid, ...user }));
        setUsers(usersArray);
      }
    });
  }, []);

  const handleResetPassword = (user) => {
    alert(`🔐 Password reset link should be sent to: ${user.email}`);
    // Add actual Firebase logic if needed
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', p:2 }}>
    {/* Sidebar */}
    <Box sx={{ width: 340, backgroundColor: '#fff', borderRight: '1px solid #eee'}}>
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight="semi-bold" color="#450001" ml={2} mt={1}>User Management</Typography>
        <Typography variant="caption" color="text.secondary" ml={2}>Manage users, roles and access</Typography>
      </Box>
      <Tabs
value={tabValue}
onChange={handleTabChange}
orientation="vertical"
scrollButtons="auto"
sx={{
  '& .MuiTab-root': {
    justifyContent: 'flex-start',
    gap: 2,
    px: 3,
    py: 0,
    m: 0,
    alignItems: 'center',
    color: '#8E0000',
    textTransform: 'none',
    fontSize: '0.99rem',
    borderRadius: 2,
  },
  '& .Mui-selected': {
    bgcolor: '#F5F5F5',
    color: '#8E0000',
    fontWeight: 'bold',
    '& svg': {
      fontSize: '1.8rem', // Make icon appear "bold"
    },
    '& .MuiTab-wrapper': {
      fontWeight: 'bold',
    },
  },
  '& .MuiTab-wrapper': {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
}}
>

        <Tab icon={<ManageAccountsOutlinedIcon />} iconPosition="start" label="Manage User" />
        <Tab icon={<PersonAddAltOutlinedIcon />} iconPosition="start" label="Add User" />
        <Tab icon={<AdminPanelSettingsOutlinedIcon />} iconPosition="start" label="Account Recovery" />
      </Tabs>
    </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
      <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    sx={{ mb: 4 }}
                >
                    <Link underline="hover" color="inherit" href="#">
                        User Management
                    </Link>
                    <Typography color="text.primary">Password Reset and Recovery</Typography>
                </Breadcrumbs>


        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {users.map((user) => (
              <Paper key={user.uid} onClick={() => setSelectedUser(user)} sx={{
                p: 2, mb: 2, borderRadius: 2, cursor: 'pointer',
                border: selectedUser?.uid === user.uid ? '2px solid #8E0000' : '1px solid #ccc',
                transition: '0.2s',
                '&:hover': { borderColor: '#8E0000', backgroundColor: '#fef7f7' }
              }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={user.photoURL || user.photoBase64} sx={{ width: 56, height: 56 }} />
                  <Box>
                    <Typography fontWeight="bold" color="#450001">{user.name}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                    <Typography variant="caption">ID: {user.staffId || 'Staff_1'}</Typography><br />
                    <Typography variant="caption" color="text.secondary">Role: {user.role}</Typography><br />
                    <Typography variant="caption">Age: {user.age || 'N/A'}</Typography><br />
                    <Typography variant="caption">Phone: {user.phone || 'N/A'}</Typography><br />
                    <Typography variant="caption">Birthday: {user.birthday || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Grid>

          <Grid item xs={12} md={7}>
            {selectedUser ? (
              <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold" color="#450001">Profile</Typography>
                  <Button
                    onClick={() => handleResetPassword(selectedUser)}
                    sx={{
                      bgcolor: '#8E0000',
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#660200' },
                    }}
                    startIcon={<LockResetIcon />}
                  >
                    Reset Password
                  </Button>
                </Box>
                <Typography><strong>Name:</strong> {selectedUser.name}</Typography>
                <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
                <Typography><strong>Age:</strong> {selectedUser.age || 'N/A'}</Typography>
                <Typography><strong>Birthday:</strong> {selectedUser.birthday || 'N/A'}</Typography>
                <Typography><strong>Phone:</strong> {selectedUser.phone || 'N/A'}</Typography>
                <Typography><strong>Role:</strong> {selectedUser.role}</Typography>
                <Typography><strong>Last Session:</strong> {selectedUser.lastSession || '02/14/25 06:33 PM'}</Typography>
              </Paper>
            ) : (
              <Typography variant="body2" color="text.secondary" mt={10}>
                Select a user to view details.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminAccountRecovery;
