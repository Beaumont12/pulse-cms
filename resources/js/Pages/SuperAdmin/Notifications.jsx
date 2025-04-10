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
  Breadcrumbs,
  Link,
  InputAdornment
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import SearchIcon from '@mui/icons-material/Search';

const Notifications = () => {
  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const tabLabels = ['Unread', 'Read', 'Messages sent'];
  const categoryLabels = ['All', 'Notices', 'System messages'];
  const categoryIcons = [<NotificationsIcon />, <EmailIcon />, <MessageIcon />];

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

  const filteredNotifications = notifications.filter((notif) =>
    notif.sender.toLowerCase().includes(search.toLowerCase()) ||
    notif.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      
      {/* Sidebar */}
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
        <Box sx={{ mb: 2, mt: 2, px: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="#450001">
            Notifications
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage messages, alerts, and user communication
          </Typography>
        </Box>

        <Tabs
          value={category}
          onChange={(e, newVal) => setCategory(newVal)}
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
          {categoryLabels.map((label, index) => (
            <Tab
              key={label}
              icon={categoryIcons[index]}
              iconPosition="start"
              label={label}
            />
          ))}
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link underline="hover" color="inherit" href="#">
            Notifications
          </Link>
          <Typography color="text.primary">{categoryLabels[category]}</Typography>
        </Breadcrumbs>

        {/* Tabs + Action */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Tabs
            value={tab}
            onChange={(e, newVal) => setTab(newVal)}
            sx={{
              borderBottom: '1px solid #ddd',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                color: '#450001',
              },
              '& .Mui-selected': {
                color: '#8E0000',
              },
            }}
          >
            {tabLabels.map((label, i) => (
              <Tab key={i} label={label} />
            ))}
          </Tabs>

          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            sx={{ backgroundColor: '#8E0000', textTransform: 'none' }}
          >
            New Notice
          </Button>
        </Box>

        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#8E0000' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Notification List (Vertical) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          {filteredNotifications.map((notif, index) => (
            <Paper
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
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

        <Button variant="outlined" sx={{ mt: 2 }}>
          Mark all as read
        </Button>
      </Box>

      {/* Modal for New Notice */}
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
          {/* Form Side */}
          <Box sx={{ flex: 2, pr: 2 }}>
            <Typography variant="h6" mb={2}>New Notice</Typography>
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

          {/* Sidebar Members */}
          <Box sx={{ flex: 1, borderLeft: '1px solid #eee', pl: 2 }}>
            <Typography variant="subtitle2" mb={2}>Search Member</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>› All (5)</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>› Support (2)</Typography>
            <Typography variant="body2">› Default Team (3)</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Notifications;
