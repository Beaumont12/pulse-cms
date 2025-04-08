import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link, IconButton
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../Components/Sidebar';

export default function ManageCourses() {
  const [expanded, setExpanded] = useState(true);
  const SIDEBAR_WIDTH_EXPANDED = 260;
  const SIDEBAR_WIDTH_COLLAPSED = 80;
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['Manage Courses', 'Add Course', 'Archived Courses'];

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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="#450001">
            Learning Management
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Manage courses and learning modules
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, textAlign: 'center' }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              Learning Management
            </Link>
            <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
          </Breadcrumbs>
        </Box>

        {/* Tabs */}
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
            float: 'left',
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
          }}
        >
          <Tab icon={<LibraryBooksIcon fontSize="small" />} iconPosition="start" label="Manage Courses" />
          <Tab icon={<AddBoxIcon fontSize="small" />} iconPosition="start" label="Add Course" />
          <Tab icon={<ArchiveIcon fontSize="small" />} iconPosition="start" label="Archived Courses" />
        </Tabs>

        <Box sx={{ ml: 25 }}>
          {tabValue === 0 && (
            <Grid container spacing={2}>
              {[{
                title: 'Biology', code: 'ITE 123', quiz: 'Quiz 1', color: '#3D0000'
              }, {
                title: 'Biochem', code: 'ITE 345', quiz: 'Quiz 3', color: '#8E0000'
              }].map((course, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: course.color, color: '#fff' }}>
                    <Typography variant="body2">{course.title} : {course.code}</Typography>
                    <Typography variant="h5">{course.quiz}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <IconButton color="inherit" size="small"><EditIcon fontSize="small" /></IconButton>
                      <IconButton color="inherit" size="small"><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Typography color="text.secondary">[Add Course Form Placeholder]</Typography>
          )}

          {tabValue === 2 && (
            <Typography color="text.secondary">[Archived Courses Placeholder]</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
