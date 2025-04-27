import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Box, Typography, Card, CardContent } from '@mui/material';

const TeacherQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const quizzesRef = ref(db, 'quizzes');

    const listener = onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched quizzes:", data);

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

    return () => {
      off(quizzesRef, 'value', listener);
    };
  }, []);

  return (
    <Box p={4} display="flex" flexWrap="wrap" gap={4}>
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
            <CardContent sx={{ textAlign: 'center', color: 'maroon' }}>
              <Typography variant="subtitle3" fontWeight="semi-bold">
                {quiz.subject} : {quiz.code}
              </Typography>
              <Typography variant="h4" fontWeight="semi-bold" mt={1}>
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
    </Box>
  );
};

export default TeacherQuizzes;
