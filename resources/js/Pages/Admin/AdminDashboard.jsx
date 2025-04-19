import React from 'react';
import {
  Box, Grid, Typography, Paper, Breadcrumbs, Link, Button, useMediaQuery
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from '@mui/material/styles';

export default function AdminDashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', p: 4 }}>
      {/* Page Title */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="#450001">
          Admin Dashboard
        </Typography>
        {/* <Typography variant="subtitle2" color="text.secondary">
          Overview and quick statistics
        </Typography> */}
      </Box>

      {/* Breadcrumbs */}
      <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // changed from 'center' to 'flex-end'
    mb: 3,
    mt: { xs: 1, sm: 0 },
    textAlign: 'right', // optional for better alignment
  }}
>
  <Breadcrumbs
    separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"
    sx={{
      maxWidth: '100%',
      justifyContent: 'flex-end',
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.95rem' },
      wordBreak: 'break-word',
      px: 1,
      mb: 0,
    }}
  >
    <Link underline="hover" color="inherit" href="#">Home</Link>
    <Typography color="text.primary">Dashboard</Typography>
  </Breadcrumbs>
</Box>

      {/* Stat Cards */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}  sm={6} md={4}>
        <Paper
  elevation={3}
  sx={{
    p: 0,
    bgcolor: '#8E0000',
    color: '#fff',
    borderRadius: 3,
    height: 160,
    width: 270 // or set a consistent height
  }}
>
  <Box sx={{ p: 4, textAlign: 'left'}}>
    <Typography variant="body1">No. of Students</Typography>
    <Typography variant="h3" sx={{ mt: 1 }}>35</Typography>
  </Box>
</Paper>

        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <Paper
  elevation={3}
  sx={{
    p: 0,
    bgcolor: '#660200',
    color: '#fff',
    borderRadius: 3,
    height: 160,
    width: 270 // or set a consistent height
  }}
>
<Box sx={{ p: 4, textAlign: 'left'}}>
            <Typography variant="body1">No. of Teachers</Typography>
            <Typography variant="h3" sx={{mt:1}}>2</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <Paper
  elevation={3}
  sx={{
    p: 0,
    bgcolor: '#FFA8A2',
    color: '#fff',
    borderRadius: 3,
    height: 160,
    width: 270 // or set a consistent height
  }}
>
<Box sx={{ p: 4, textAlign: 'left'}}>
            <Typography variant="body1">No. of Courses</Typography>
            <Typography variant="h3" sx={{mt:1}}>6</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Graph Placeholder */}
      <Paper
  elevation={3}
  sx={{
    p: 4,
    mb: 3,
    color: '#fff',
    borderRadius: 3,
    position: 'relative',
    minHeight: 180, // ensure there's space
  }}
>
  {/* Date at top left */}
  <Box sx={{ position: 'absolute', top: 25, right: 25 }}>
    <Button variant="outlined" size="small">Date ▼</Button>
  </Box>

  {/* Centered Graph */}
  <Box
    sx={{
      height: 270,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="body1" color="text.secondary">
      [Graph Placeholder]
    </Typography>
  </Box>
</Paper>
      {/* Gauge Charts */}
      <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={6}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: 200, width: 570 }}>
      <Typography fontWeight="bold" color="#450001" mb={1}>
        Participation Rate
      </Typography>
      <Typography color="text.secondary" textAlign="center">
        [Gauge Chart Placeholder]
      </Typography>
    </Paper>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3,height: 200, width: 570 }}>
      <Typography fontWeight="bold" color="#450001" mb={1}>
        Completion Rate
      </Typography>
      <Typography color="text.secondary" textAlign="center">
        [Gauge Chart Placeholder]
      </Typography>
    </Paper>
  </Grid>
</Grid>

    </Box>
  );
}
