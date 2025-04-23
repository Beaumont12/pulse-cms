import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 4,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 5,
          textAlign: 'center',
          borderRadius: 3,
          maxWidth: 480,
          width: '100%',
        }}
      >
        <AddCircleOutlineIcon sx={{ fontSize: 50, color: '#8E0000', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create your first quiz!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/teacher/quizzes/create')}
          sx={{
            backgroundColor: '#8E0000',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#a00000',
            },
          }}
        >
          Create a quiz
        </Button>
      </Paper>
    </Box>
  );
};

export default TeacherDashboard;
