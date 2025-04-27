import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { Box, Typography, Card, CardContent, IconButton, Dialog, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TeacherQuestionBank = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [open, setOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', subject: '', code: '', color: '#f8d7da' });

  useEffect(() => {
    const db = getDatabase();
    const quizzesRef = ref(db, 'questionBank'); // 🔥 Quizzes for later stored under 'questionBank'

    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const quizzesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          title: value.title || 'Untitled Quiz',
          subject: value.subject || 'No Subject',
          code: value.code || 'No Code',
          color: value.color || '#fde2e4',
        }));
        setQuizzes(quizzesArray);
      } else {
        setQuizzes([]);
      }
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateQuiz = () => {
    const db = getDatabase();
    const quizzesRef = ref(db, 'questionBank'); // 🔥 save under questionBank node
    const newQuizRef = push(quizzesRef);

    set(newQuizRef, newQuiz)
      .then(() => {
        console.log('Quiz created successfully!');
        handleClose();
        setNewQuiz({ title: '', subject: '', code: '', color: '#f8d7da' });
      })
      .catch((error) => {
        console.error('Error creating quiz:', error);
      });
  };

  return (
    <Box p={4} display="flex" flexWrap="wrap" gap={4}>
      {/* New Quiz Card */}
      <Card
        sx={{
          width: 250,
          height: 180,
          backgroundColor: '#f4f4f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 2,
          border: '1px solid #dcdcdc',
          cursor: 'pointer',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
        onClick={handleOpen}
      >
        <IconButton size="large">
          <AddIcon sx={{ fontSize: 40, color: 'maroon' }} />
        </IconButton>
      </Card>

      {/* Existing quizzes */}
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            sx={{
              width: 250,
              height: 180,
              backgroundColor: quiz.color,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 3,
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', color: 'white' }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {quiz.subject} : {quiz.code}
              </Typography>
              <Typography variant="h5" fontWeight="bold" mt={1}>
                {quiz.title}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          No quizzes found.
        </Typography>
      )}

      {/* Create Quiz Modal */}
      <Dialog open={open} onClose={handleClose}>
        <Box p={4} display="flex" flexDirection="column" gap={2} width={300}>
          <Typography variant="h6" fontWeight="bold">Create New Quiz</Typography>
          <TextField
            label="Title"
            value={newQuiz.title}
            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Subject"
            value={newQuiz.subject}
            onChange={(e) => setNewQuiz({ ...newQuiz, subject: e.target.value })}
            fullWidth
          />
          <TextField
            label="Code"
            value={newQuiz.code}
            onChange={(e) => setNewQuiz({ ...newQuiz, code: e.target.value })}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleCreateQuiz}>
            Create
          </Button>
        </Box>
      </Dialog>
    </Box>
  ); 
};

export default TeacherQuestionBank;
