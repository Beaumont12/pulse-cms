import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link, IconButton
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../Components/Sidebar';

export default function ManageUsers() {
  const [expanded, setExpanded] = useState(true);
  const SIDEBAR_WIDTH_EXPANDED = 260;
  const SIDEBAR_WIDTH_COLLAPSED = 80;
  const [tabValue, setTabValue] = useState(0);

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
        <Box mb={2}>
          <Typography variant="h5" fontWeight="bold" color="#450001">User Management</Typography>
        </Box>

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="#">User Management</Link>
          <Typography color="text.primary">Manage User</Typography>
        </Breadcrumbs>

        {/* Nested Sidebar as Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 2, width: 200, float: 'left', mr: 4 }}
        >
          <Tab label="Manage User" />
          <Tab label="Add User" />
          <Tab label="Password Resets & Account Recovery" />
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
