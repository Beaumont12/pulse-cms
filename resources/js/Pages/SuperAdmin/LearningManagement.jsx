import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link, IconButton
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import QuizIcon from '@mui/icons-material/Quiz';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Sidebar from '../../Components/Sidebar';

export default function LearningManagement() {
  const [expanded, setExpanded] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const SIDEBAR_WIDTH_EXPANDED = 260;
  const SIDEBAR_WIDTH_COLLAPSED = 80;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabLabels = ['Quizzes', 'Question Bank', 'Courses'];

  const dummyData = {
    quizzes: [
      { id: 1, course: 'Biology', code: 'ITE 123', title: 'Quiz 1', bgColor: '#2E0000' },
      { id: 2, course: 'Biochem', code: 'ITE 345', title: 'Quiz 3', bgColor: '#8E0000' },
    ],
    questionBank: [
      { id: 1, course: 'Biology', code: 'ITE 123', title: 'Quiz 1', bgColor: '#FFC1C1' },
      { id: 2, course: 'Biochem', code: 'ITE 345', title: 'Quiz 3', bgColor: '#2E0000' },
      { id: 3, course: 'Biology', code: 'ITE 123', title: 'Quiz 1', bgColor: '#FF2E2E' },
      { id: 4, course: 'Biochem', code: 'ITE 345', title: 'Quiz 3', bgColor: '#8E0000' },
    ],
    courses: [
      { id: 1, title: 'ITE 345', desc: 'Neurology', bgColor: '#2E0000' },
      { id: 2, title: 'ITE 678', desc: 'Immunology', bgColor: '#8E0000' },
      { id: 3, title: 'ITE 123', desc: 'Microbiology', bgColor: '#FF2E2E' },
      { id: 4, title: 'ITE 910', desc: 'Biotech', bgColor: '#FFC1C1' },
    ]
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
        {/* Page Title */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="#450001">
            Learning Management
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Manage quizzes, question bank and courses
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          mt: { xs: 1, sm: 0 },
          textAlign: 'center',
         }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
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
          <Tab icon={<QuizIcon fontSize="small" />} iconPosition="start" label="Quizzes" />
          <Tab icon={<LibraryBooksIcon fontSize="small" />} iconPosition="start" label="Question Bank" />
          <Tab icon={<MenuBookIcon fontSize="small" />} iconPosition="start" label="Courses" />
        </Tabs>

        {/* Content */}
        <Box sx={{ ml: 25 }}>
          {tabValue === 0 && (
            <Grid container spacing={2}>
              {dummyData.quizzes.map((quiz) => (
                <Grid item key={quiz.id} xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 3, borderRadius: 2, bgcolor: quiz.bgColor, color: '#fff' }}>
                    <Typography variant="body2">{quiz.course} : {quiz.code}</Typography>
                    <Typography variant="h5" fontWeight="bold">{quiz.title}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2}>
              {dummyData.questionBank.map((q) => (
                <Grid item key={q.id} xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 3, borderRadius: 2, bgcolor: q.bgColor, color: '#450001' }}>
                    <Typography variant="body2">{q.course} : {q.code}</Typography>
                    <Typography variant="h5" fontWeight="bold">{q.title}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={2}>
              {dummyData.courses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 3, borderRadius: 2, bgcolor: course.bgColor, color: '#fff' }}>
                    <Typography variant="body2">{course.title}</Typography>
                    <Typography variant="h6">{course.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
