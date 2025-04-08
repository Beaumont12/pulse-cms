import React from 'react';
import {
  Box, Grid, Typography, Paper, Breadcrumbs, Link, Button, useMediaQuery
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from '@mui/material/styles';

export default function SuperAdminDashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', p: 4 }}>
      {/* Page Title */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="#450001">
          Super Admin Dashboard
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Overview and quick statistics
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
          separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"
          sx={{
            maxWidth: '100%',
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.95rem' },
            wordBreak: 'break-word',
            px: 1,
            mb: 3,
          }}
        >
          <Link underline="hover" color="inherit" href="#">Home</Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#8E0000', color: '#fff', borderRadius: 3 }}>
            <Typography variant="body2">No. of Students</Typography>
            <Typography variant="h4">35</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#660200', color: '#fff', borderRadius: 3 }}>
            <Typography variant="body2">No. of Teachers</Typography>
            <Typography variant="h4">2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#FFA8A2', color: '#450001', borderRadius: 3 }}>
            <Typography variant="body2">No. of Courses</Typography>
            <Typography variant="h4">6</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Graph Placeholder */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          [Graph Placeholder]
        </Typography>
        <Button variant="outlined" size="small">Date ▼</Button>
      </Paper>

      {/* Gauge Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <Typography fontWeight="bold" color="#450001" mb={1}>Participation Rate</Typography>
            <Typography color="text.secondary">[Gauge Chart Placeholder]</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <Typography fontWeight="bold" color="#450001" mb={1}>Completion Rate</Typography>
            <Typography color="text.secondary">[Gauge Chart Placeholder]</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
