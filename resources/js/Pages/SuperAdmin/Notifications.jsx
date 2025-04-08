// ✅ NotificationPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper,
  Avatar,
  TextField,
  Modal,
  Divider,
  Badge,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';

const NotificationPage = () => {
  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const notifications = [
    {
      sender: 'Agent',
      message: 'changed your note status (No.2188685)',
      date: '2017-09-11 19:15:48',
    },
    {
      sender: 'Agent',
      message: 'assigned a note to you (No.2188685)',
      date: '2017-09-11 19:14:32',
    },
    {
      sender: 'Agent',
      message: 'assigned a note to you (No.1713862)',
      date: '2017-09-11 19:13:46',
    },
  ];

  const categories = [
    { label: 'All', count: 3 },
    { label: 'Notices', count: 0 },
    { label: 'System messages', count: 3 },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f1f1f1' }}>
      {/* Left Side Menu */}
      <Box sx={{ width: 250, backgroundColor: '#fff', p: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Notification
        </Typography>
        <List>
          {categories.map((item) => (
            <ListItemButton
              key={item.label}
              selected={category === item.label}
              onClick={() => setCategory(item.label)}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: '#e0f0ff',
                  fontWeight: 'bold',
                },
              }}
            >
              <ListItemText primary={item.label} />
              {item.count > 0 && (
                <Badge badgeContent={item.count} color="error" />
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Middle Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: '#fff', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} sx={{ borderBottom: '1px solid #ddd' }}>
            <Tab label="Unread" />
            <Tab label="Read" />
            <Tab label="Messages sent" />
          </Tabs>
          <Button variant="contained" onClick={() => setModalOpen(true)}>New notice</Button>
        </Box>

        {/* Notification list */}
        <Box>
          {notifications.map((notif, index) => (
            <Paper
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mb: 1,
                borderLeft: '4px solid #8E0000',
                backgroundColor: '#fffdfd',
              }}
            >
              <Avatar sx={{ mr: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight="bold">{notif.sender}</Typography>
                <Typography variant="body2">{notif.message}</Typography>
              </Box>
              <Typography variant="caption" color="textSecondary">
                {notif.date}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Button variant="outlined" sx={{ mt: 2 }}>Mark all as read</Button>
      </Box>

      {/* New Notice Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 2,
            display: 'flex',
            p: 4,
          }}
        >
          {/* Form Section */}
          <Box sx={{ flex: 2, pr: 2 }}>
            <Typography variant="h6" mb={2}>New notice</Typography>
            <TextField fullWidth label="To" variant="outlined" sx={{ mb: 2 }} />
            <TextField fullWidth label="Subject" variant="outlined" sx={{ mb: 2 }} />
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Content"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" display="block" mb={2}>
              Attach (File must be less than 1MB)
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" fullWidth>Send</Button>
          </Box>

          {/* Member Section */}
          <Box sx={{ flex: 1, borderLeft: '1px solid #eee', pl: 2 }}>
            <Typography variant="subtitle2" mb={2}>Search member</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>› All (5)</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>› Support (2)</Typography>
            <Typography variant="body2">› Default team (3)</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default NotificationPage;
