import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Breadcrumbs,
  Link
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnalyticsOutlined } from '@mui/icons-material';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

export default function SuperAdminUserProgress() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabLabels = ['User Progress Reports', 'Quiz & Course Analytics'];

  const getCurrentTab = () => {
    return location.pathname.includes('SuperAdminQuizandCourseAnalytics') ? 1 : 0;
  };

  const [tabValue, setTabValue] = useState(getCurrentTab());

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/super_admin/SuperAdminUserProgress');
    if (newValue === 1) navigate('/super_admin/SuperAdminQuizandCourseAnalytics');
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar Tabs */}
      <Box
        sx={{
          width: 280,
          backgroundColor: '#fff',
          borderRight: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          py: 2,
        }}
      >
        <Box sx={{ mb: 2, mt: 2, p: 2 }}>
          <Typography variant="h5" fontWeight="semi-bold" color="#450001">
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
          <Tab icon={<AnalyticsOutlinedIcon fontSize="small" />} iconPosition="start" label="Quiz & Course Analytics" />
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">
            Report and Analytics
          </Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {/* Tab Content */}
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
