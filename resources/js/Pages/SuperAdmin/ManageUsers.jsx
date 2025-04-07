import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link, IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockResetIcon from '@mui/icons-material/LockReset';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../Components/Sidebar';

export default function ManageUsers() {
  const [expanded, setExpanded] = useState(true);
  const SIDEBAR_WIDTH_EXPANDED = 260;
  const SIDEBAR_WIDTH_COLLAPSED = 80;
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['Manage User', 'Add User', 'Password Resets & Account Recovery'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Sidebar role="super_admin" expanded={expanded} onToggle={() => setExpanded(prev => !prev)} />

      <Box
        sx={{
          flexGrow: 1,
          ml: expanded ? `${SIDEBAR_WIDTH_EXPANDED}px` : `${SIDEBAR_WIDTH_COLLAPSED}px`,
          transition: 'margin 0.4s ease-in-out',
          p: 3,
          backgroundColor: '#F9F9FC',
        }}
      >
        {/* Page Title and Breadcrumbs */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="#450001">
            User Management
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Manage users, roles and access
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            mt: { xs: 1, sm: 0 },
            textAlign: 'center',
          }}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              maxWidth: '100%',
              justifyContent: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.95rem' },
              wordBreak: 'break-word',
              px: 1,
            }}
          >
            <Link underline="hover" color="inherit" href="#">User Management</Link>
            <Typography color="text.primary">Manage User</Typography>
          </Breadcrumbs>
        </Box>

        {/* Nested Sidebar as Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            backgroundColor: '#fff',
            borderRadius: 2,
            width: 240,
            float: 'left',
            mr: 4,
            height: '100%',
            '& .MuiTab-root': {
              justifyContent: 'flex-start',
              gap: 1.5,
              px: 2,
              alignItems: 'center',
              color: '#450001',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '0.95rem',
            },
            '& .Mui-selected': {
              bgcolor: '#F5F5F5',
              color: '#8E0000',
            },
          }}
        >
          <Tab icon={<PersonIcon fontSize="small" />} iconPosition="start" label="Manage User" />
          <Tab icon={<PersonAddIcon fontSize="small" />} iconPosition="start" label="Add User" />
          <Tab icon={<LockResetIcon fontSize="small" />} iconPosition="start" label="Password Resets & Account Recovery" />
        </Tabs>

        {/* Content Based on Tab Selection */}
        <Box sx={{ ml: 25 }}>
          {tabValue === 0 && (
            <Grid container spacing={2}>
              {[{
                name: 'Flynn Y. Rigonan', email: 'flynnrigonan@gmail.com', id: 'Staff_1', role: 'Admin', age: 21, phone: '09128765342', birthday: 'September 20, 2001'
              }, {
                name: 'Sheena Mechaela', email: 'sheenabasiga@gmail.com', id: 'Staff_2', role: 'Teacher', age: 21, phone: '09128765342', birthday: 'September 20, 2001'
              }, {
                name: 'Relgin Paloma', email: 'relginpaloma@gmail.com', id: 'Staff_3', role: 'Student', age: 21, phone: '09128765342', birthday: 'September 20, 2001'
              }].map((user, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography fontWeight="bold" color="#450001">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    <Typography variant="caption" display="block">ID: {user.id}</Typography>
                    <Typography variant="caption" display="block">Role: {user.role}</Typography>
                    <Typography variant="caption" display="block">Age: {user.age}</Typography>
                    <Typography variant="caption" display="block">Phone: {user.phone}</Typography>
                    <Typography variant="caption" display="block">Birthday: {user.birthday}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <IconButton color="success" size="small"><EditIcon fontSize="small" /></IconButton>
                      <IconButton color="error" size="small"><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Typography color="text.secondary">[Add User Form Placeholder]</Typography>
          )}

          {tabValue === 2 && (
            <Typography color="text.secondary">[Password Reset Placeholder]</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
