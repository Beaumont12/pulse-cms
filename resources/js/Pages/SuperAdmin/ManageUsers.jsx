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

export default function ManageUsers() {
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['Manage User', 'Add User', 'Password Resets & Account Recovery'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Title + Subtitle */}
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
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="#">
            User Management
          </Link>
          <Typography color="text.primary">
            {tabLabels[tabValue]}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex' }}>
        {/* Sidebar Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            width: 240,
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
            '& .MuiTab-wrapper': {
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left',
            },
          }}
        >
          <Tab icon={<PersonIcon fontSize="small" />} iconPosition="start" label="Manage User" />
          <Tab icon={<PersonAddIcon fontSize="small" />} iconPosition="start" label="Add User" />
          <Tab icon={<LockResetIcon fontSize="small" />} iconPosition="start" label="Account Recovery" />
        </Tabs>

        {/* Tab Panel Content */}
        <Box sx={{ flexGrow: 1 }}>
          {tabValue === 0 && (
            <Grid container spacing={2}>
              {/* ... your user cards ... */}
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
