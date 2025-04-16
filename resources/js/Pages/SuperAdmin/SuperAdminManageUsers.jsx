import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link, Avatar
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

export default function SuperAdminManageUsers() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    if (location.pathname.includes('SuperAdminAddUser')) return 1;
    if (location.pathname.includes('SuperAdminAccountRecovery')) return 2;
    return 0;
  };
  
  const [tabValue, setTabValue] = useState(getCurrentTab());
  const tabLabels = ['Manage User', 'Add User', 'Account Recovery'];
  const [users, setUsers] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/super_admin/SuperAdminManageUsers', { replace: true });
    if (newValue === 1) navigate('/super_admin/SuperAdminAddUser', { replace: true });
    if (newValue === 2) navigate('/super_admin/SuperAdminAccountRecovery', { replace: true });
  };
  

  useEffect(() => {
    console.log("📍 Current route:", location.pathname); // see current path
    const usersRef = dbRef(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("🔥 USERS FROM FIREBASE:", data);
      if (data) {
        const loadedUsers = Object.entries(data).map(([uid, userData]) => ({ uid, ...userData }));
        setUsers(loadedUsers);
      } else {
        setUsers([]);
      }
    });
  }, []);
  

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', p:2 }}>
      {/* Sidebar */}
      <Box sx={{ width: 280, backgroundColor: '#fff', borderRight: '1px solid #eee'}}>
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
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">User Management</Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {/* Manage Users Tab */}
        {tabValue === 0 && (
          <>
            {users.length === 0 ? (
              <Typography sx={{ mx: 2 }}>No users found in Firebase.</Typography>
            ) : (
              <Grid container spacing={2}>
                {users.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.uid}>
                    <Paper sx={{
                      p: 3,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      boxShadow: 2
                    }}>
                      <Avatar
                        src={user.photoURL || user.photoBase64}
                        alt={user.name}
                        sx={{ width: 56, height: 56 }}
                      />
                      <Box>
                        <Typography fontWeight="bold">{user.name || 'No Name'}</Typography>
                        <Typography variant="body2" color="text.secondary">{user.email || 'No Email'}</Typography>
                        <Typography variant="caption" color="#8E0000">{user.role || 'No Role'}</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {/* Redirect Placeholder */}
        {tabValue === 1 && (
          <Typography color="text.secondary">Redirecting to Add User Page...</Typography>
        )}

        {tabValue === 2 && (
          <Typography color="text.secondary">[Password Reset Placeholder]</Typography>
        )}
      </Box>
    </Box>
  );
}
