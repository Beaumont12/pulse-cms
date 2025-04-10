import React, { useState } from 'react';
import {
  Box, Typography, Tabs, Tab, TextField, Paper, Grid,
  Button, List, ListItem, ListItemText, ListItemIcon, MenuItem, Select,
  Switch, FormControlLabel, Divider, Table, TableContainer, TableHead, TableBody, TableRow, TableCell
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [autoLogout, setAutoLogout] = useState(15);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    console.log({ notifEnabled, autoLogout, email, password });
  };

  const activityLogs = [
    { time: 'Apr 10, 2025 - 3:42 PM', action: 'Logged in from web' },
    { time: 'Apr 09, 2025 - 8:13 AM', action: 'Changed password' },
    { time: 'Apr 08, 2025 - 7:55 PM', action: 'Logged in from mobile' },
  ];

  const tabLabels = ['Account Settings', 'Preferences', 'Activity Logs & Export', 'Access Control'];

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar Tabs */}
      <Box sx={{
        width: 280,
        backgroundColor: '#fff',
        borderRight: '1px solid #eee',
        py: 2,
      }}>
        {/* Title */}
        <Box sx={{ mb: 2, mt: 2, p: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="#450001">
            Settings
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your preferences, security, and system settings
          </Typography>
        </Box>

        <Tabs
          value={tabValue}
          onChange={(e, newVal) => setTabValue(newVal)}
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
          <Tab icon={<AccountCircleIcon fontSize="small" />} iconPosition="start" label="Account Settings" />
          <Tab icon={<SettingsIcon fontSize="small" />} iconPosition="start" label="Preferences" />
          <Tab icon={<HistoryIcon fontSize="small" />} iconPosition="start" label="Activity Logs & Export" />
          <Tab icon={<LockIcon fontSize="small" />} iconPosition="start" label="Access Control" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        
        {/* Panel Content */}
        {tabValue === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" color="#450001" mb={2}>Change Email</Typography>
                <TextField
                  fullWidth
                  label="New Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography fontWeight="bold" color="#450001" mb={2}>Change Password</Typography>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ backgroundColor: '#8E0000', textTransform: 'none' }}
                >
                  Save Changes
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" color="#450001" mb={2}>Notification Preferences</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifEnabled}
                      onChange={(e) => setNotifEnabled(e.target.checked)}
                    />
                  }
                  label="Enable Notifications"
                  sx={{ mb: 2 }}
                />

                <Divider sx={{ my: 2 }} />

                <Typography fontWeight="bold" color="#450001" mb={1}>
                  Auto Logout Timer
                </Typography>
                <Select
                  value={autoLogout}
                  onChange={(e) => setAutoLogout(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                >
                  <MenuItem value={5}>5 minutes</MenuItem>
                  <MenuItem value={10}>10 minutes</MenuItem>
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={30}>30 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                </Select>
                <Typography variant="caption" color="text.secondary">
                  Automatically log out if there's no activity
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        {tabValue === 2 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" color="#450001" mb={2}>Login Activity</Typography>
                <List dense>
                  {activityLogs.map((log, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <HistoryIcon fontSize="small" sx={{ color: '#8E0000' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={log.action}
                        secondary={log.time}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ fontSize: '0.75rem', color: 'text.secondary' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" color="#450001" mb={2}>Export Data</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Download your reports or user activity logs for documentation.
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<FileDownloadIcon />}
                  sx={{
                    borderColor: '#8E0000',
                    color: '#8E0000',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      borderColor: '#8E0000',
                    },
                  }}
                >
                  Download CSV
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}

        {tabValue === 3 && (
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography fontWeight="bold" color="#450001" mb={2}>Role-Based Access</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role</TableCell>
                    <TableCell>Access Permissions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Super Admin</TableCell>
                    <TableCell>All system modules (read/write/delete)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Admin</TableCell>
                    <TableCell>Users, courses, and reports management</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Quiz, leaderboard, and feedback features</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
