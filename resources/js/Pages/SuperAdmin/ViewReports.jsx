import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function ViewReports() {
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['User Progress Reports', 'Quiz & Course Analytics'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      
      {/* Sidebar Nested Tabs */}
      <Box sx={{
        width: 280,
        backgroundColor: '#fff',
        borderRight: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
      }}>
        {/* Title and Subtitle */}
        <Box sx={{ mb: 2, mt: 2, p: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="#450001">
            Reports & Analytics
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Visualize progress and assessment performance
          </Typography>
        </Box>

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
          <Tab icon={<BarChartIcon fontSize="small" />} iconPosition="start" label="User Progress Reports" />
          <Tab icon={<AssessmentIcon fontSize="small" />} iconPosition="start" label="Quiz & Course Analytics" />
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        
        {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">
            Report and Analytics
          </Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {/* Content based on selected tab */}
        {tabValue === 0 && (
          <>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Typography fontWeight="bold" color="#450001">Learning Assessment</Typography>
              <Typography variant="body2" color="text.secondary">[Line Chart Placeholder]</Typography>
            </Paper>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 180 }}>
                <Typography fontWeight="bold" color="#450001" fontSize="0.95rem">
                  Participation Rate
                </Typography>
                <Typography variant="body2" color="text.secondary">[Gauge Placeholder]</Typography>
              </Paper>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 180 }}>
                <Typography fontWeight="bold" color="#450001" fontSize="0.95rem">
                  Completion Rate
                </Typography>
                <Typography variant="body2" color="text.secondary">[Gauge Placeholder]</Typography>
              </Paper>
            </Box>
          </>
        )}

        {tabValue === 1 && (
          <>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Typography fontWeight="bold" color="#450001">Quiz Assessment Rate</Typography>
              <Typography variant="body2" color="text.secondary">[Line Chart Placeholder]</Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Typography fontWeight="bold" color="#450001">Course Assessment Rate</Typography>
              <Typography variant="body2" color="text.secondary">[Line Chart Placeholder]</Typography>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}
