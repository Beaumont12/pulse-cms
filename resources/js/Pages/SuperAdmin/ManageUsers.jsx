import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockResetIcon from '@mui/icons-material/LockReset';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function ManageUsers() {
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['Manage User', 'Add User', 'Password Resets & Account Recovery'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      
      {/* Sidebar Nested Tabs with Title + Subtitle */}
      <Box sx={{
        width: 280,
        backgroundColor: '#fff',
        borderRight: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
      }}>
        {/* Title + Subtitle inside sidebar */}
        <Box sx={{ mb: 2, mt: 2, p: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="#450001">
            User Management
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage users, roles and access
          </Typography>
        </Box>

        {/* Vertical Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              justifyContent: 'flex-start',
              gap: 1.5,
              px: 2,
              py: 1.2,
              alignItems: 'center',
              color: '#450001',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 2,
            },
            '& .Mui-selected': {
              bgcolor: '#F5F5F5',
              color: '#8E0000',
            },
            '& .MuiTab-wrapper': {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              textAlign: 'left',
            },
          }}
        >
          <Tab icon={<PersonIcon fontSize="small" />} iconPosition="start" label="Manage User" />
          <Tab icon={<PersonAddIcon fontSize="small" />} iconPosition="start" label="Add User" />
          <Tab icon={<LockResetIcon fontSize="small" />} iconPosition="start" label="Account Recovery" />
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <Link underline="hover" color="inherit" href="#">
            User Management
          </Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {/* Tab Panel Content */}
        {tabValue === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>User Card Placeholder</Paper>
            </Grid>
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
  );
}
