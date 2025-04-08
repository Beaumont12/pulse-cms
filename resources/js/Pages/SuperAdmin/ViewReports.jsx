import React, { useState } from 'react';
import {
  Box, Typography, Tabs, Tab, Paper, Breadcrumbs, Link
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Sidebar from '../../Components/Sidebar';

export default function ViewReports() {
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const SIDEBAR_WIDTH_EXPANDED = 260;
  const SIDEBAR_WIDTH_COLLAPSED = 80;
  const tabLabels = ['User Progress Reports', 'Quiz & Course Analytics'];

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
        {/* Title and Subtitle */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="#450001">
            Report and Analytics
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Visualize progress and assessment performance
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link underline="hover" color="inherit" href="#">
              Report and Analytics
            </Link>
            <Typography color="text.primary">
              {tabLabels[tabValue]}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Subsection layout with sidebar and content side-by-side */}
        <Box sx={{ display: 'flex', gap: 4, height: '100%' }}>
          {/* Tabs Sidebar */}
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
              height: '100%',
              mr: 4,
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
            <Tab icon={<BarChartIcon fontSize="small" />} iconPosition="start" label="User Progress Reports" />
            <Tab icon={<AssessmentIcon fontSize="small" />} iconPosition="start" label="Quiz & Course Analytics" />
          </Tabs>

          {/* Main Content */}
          <Box sx={{ flexGrow: 1 }}>
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
      </Box>
    </Box>
  );
}
