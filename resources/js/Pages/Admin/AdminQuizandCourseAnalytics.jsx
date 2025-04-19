import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link, IconButton, Menu, MenuItem
} from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

import { useNavigate, useLocation } from 'react-router-dom';

// Sample data
const dataUp = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 50 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 55 },
  { name: 'Jun', value: 70 }
];

const dataDown = [
  { name: 'Jan', value: 70 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 35 }
];

export default function AdminQuizandCourseAnalytics() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabLabels = ['User Progress Reports', 'Quiz & Course Analytics'];

  const getCurrentTab = () => {
    return location.pathname.includes('AdminQuizandCourseAnalytics') ? 1 : 0;
  };

  const [tabValue, setTabValue] = useState(getCurrentTab());

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/admin/AdminUserProgress');
    if (newValue === 1) navigate('/admin/AdminQuizandCourseAnalytics');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', p:2 }}>
             {/* Sidebar */}
             <Box sx={{ width: 340, backgroundColor: '#fff', borderRight: '1px solid #eee'}}>
        <Box sx={{ mb: 2, mt: 2, p: 2 }}>
          <Typography variant="h6" fontWeight="semi-bold" color="#450001">
            Report and Analytics
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Track insights and trends
          </Typography>
        </Box>

         <Tabs
                 value={tabValue}
                 onChange={handleTabChange}
                 orientation="vertical"
                 scrollButtons="auto"
                 sx={{
                   '& .MuiTab-root': {
                     justifyContent: 'flex-start',
                     gap: 2,
                     px: 3,
                     py: 0,
                     m: 0,
                     alignItems: 'center',
                     color: '#8E0000',
                     textTransform: 'none',
                     fontSize: '0.99rem',
                     borderRadius: 2,
                   },
                   '& .Mui-selected': {
                     bgcolor: '#F5F5F5',
                     color: '#8E0000',
                     fontWeight: 'bold',
                     '& svg': {
                       fontSize: '1.8rem', // Make icon appear "bold"
                     },
                     '& .MuiTab-wrapper': {
                       fontWeight: 'bold',
                     },
                   },
                   '& .MuiTab-wrapper': {
                     flexDirection: 'row',
                     justifyContent: 'flex-start',
                   },
                 }}
               >
          <Tab icon={<BarChartIcon />} iconPosition="start" label="User Progress Reports" />
          <Tab icon={<AnalyticsOutlinedIcon />} iconPosition="start" label="Quiz & Course Analytics" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">
            Report and Analytics
          </Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {/* Charts */}
        <Grid container spacing={3}>
          {[{
            title: 'Quiz Assessment Rate',
            data: dataUp,
            border: '2px solid #8E0000'
          },
          {
            title: 'Course Assessment Rate',
            data: dataDown,
            border: '1px solid #ddd'
          }].map((chart, index) => (
            <Grid item xs={12} md={10} key={index}>
              <Paper elevation={2} sx={{
                p: 2,
                borderRadius: 2,
                border: chart.border,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: 200
              }}>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 12, right: 12 }}
                  onClick={handleClick}
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>View Details</MenuItem>
                  <MenuItem onClick={handleClose}>Export</MenuItem>
                </Menu>

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chart.data}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="value" stroke="#8E0000" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>

                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ mt: -2, color: '#8E0000', fontWeight: 'bold' }}
                >
                  {chart.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
