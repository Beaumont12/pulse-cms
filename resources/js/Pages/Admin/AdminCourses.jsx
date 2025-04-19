import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Breadcrumbs,
  Link
} from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import BiotechIcon from '@mui/icons-material/Biotech';
import ScienceIcon from '@mui/icons-material/Science';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminCourses() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabLabels = ['Quizzes', 'Question Bank', 'Courses'];

  const getCurrentTab = () => {
    if (location.pathname.includes('AdminQuestionBank')) return 1;
    if (location.pathname.includes('AdminCourses')) return 2;
    return 0;
  };

  const [tabValue, setTabValue] = useState(getCurrentTab());

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/admin/AdminQuizzes');
    if (newValue === 1) navigate('/admin/AdminQuestionBank');
    if (newValue === 2) navigate('/admin/AdminCourses');
  };

  useEffect(() => {
    setTabValue(getCurrentTab());
  }, [location.pathname]);

  return (
     <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', p:2 }}>
              {/* Sidebar */}
              <Box sx={{ width: 340, backgroundColor: '#fff', borderRight: '1px solid #eee'}}>
        <Box sx={{ mb: 2, mt: 2, p: 2 }}>
          <Typography variant="h6" fontWeight="semi-bold" color="#450001">
            Learning Management
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage downloadable content and uploaded resources
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
          <Tab icon={<AssignmentOutlinedIcon />} iconPosition="start" label="Quizzes" />
          <Tab icon={<QuizOutlinedIcon />} iconPosition="start" label="Question Bank" />
          <Tab icon={<LocalLibraryOutlinedIcon />} iconPosition="start" label="Courses" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">
            Learning Management
          </Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {tabValue === 2 && (
          <Grid container spacing={3}>
            {[
              { code: 'ITE 345', subject: 'Neurology', bg: '#3b0000', icon: <PsychologyAltIcon /> },
              { code: 'ITE 678', subject: 'Immunology', bg: '#8e0000', icon: <CoronavirusIcon /> },
              { code: 'ITE 123', subject: 'Microbiology', bg: '#ff0000', icon: <ScienceIcon /> },
              { code: 'ITE 910', subject: 'Biotech', bg: '#ffcccc', icon: <BiotechIcon />, textColor: '#450001' },
            ].map((course, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: course.bg,
                    color: course.textColor || '#fff',
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 0.5,
                  }}
                >
                  <Typography fontSize="1rem" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {course.icon} {course.code}
                  </Typography>
                  <Typography fontSize="0.9rem">{course.subject}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
