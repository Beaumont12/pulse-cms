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

import { useLocation, useNavigate } from 'react-router-dom';

export default function SuperAdminQuestionBank() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabLabels = ['Quizzes', 'Question Bank', 'Courses'];

  const getCurrentTab = () => {
    if (location.pathname.includes('SuperAdminQuestionBank')) return 1;
    if (location.pathname.includes('SuperAdminCourses')) return 2;
    return 0;
  };

  const [tabValue, setTabValue] = useState(getCurrentTab());

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate('/super_admin/SuperAdminQuizzes');
    if (newValue === 1) navigate('/super_admin/SuperAdminQuestionBank');
    if (newValue === 2) navigate('/super_admin/SuperAdminCourses');
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

        {tabValue === 1 && (
          <Grid container spacing={3}>
            {[
              { subject: 'Biology : ITE 123', title: 'Quiz 1', bg: '#ffcccc', color: '#450001' },
              { subject: 'Biochem : ITE 345', title: 'Quiz 3', bg: '#3b0000', color: '#fff' },
              { subject: 'Biology : ITE 123', title: 'Quiz 1', bg: '#ff0000', color: '#fff' },
              { subject: 'Biochem : ITE 345', title: 'Quiz 3', bg: '#8e0000', color: '#fff' },
            ].map((quiz, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: quiz.bg,
                    color: quiz.color,
                    height: 140,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  <Typography fontSize="0.95rem" sx={{ mb: 1 }}>
                    {quiz.subject}
                  </Typography>
                  <Typography fontSize="1.5rem">{quiz.title}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
