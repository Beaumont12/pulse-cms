import React, { useState } from 'react';
import {
  Box, Typography, Tabs, Tab, TextField, Button, Paper,
  Accordion, AccordionSummary, AccordionDetails, InputLabel,
  Divider, Avatar, Snackbar, IconButton, Modal, Chip
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

const Help = () => {
  const [tabValue, setTabValue] = useState(0);
  const [form, setForm] = useState({ name: '', message: '', file: null });
  const [copied, setCopied] = useState(false);
  const [selectedDev, setSelectedDev] = useState(null);

  const devs = [
    {
      name: 'Relgin D. Paloma',
      role: 'Lead Developer',
      email: 'relgin.devs@example.com',
      avatar: '/devs/sheena.png',
      bio: 'Responsible for architecture and backend integration.',
    },
    {
      name: 'Flynn Y. Rigonan',
      role: 'UI/UX & Integration',
      email: 'flynn.devs@example.com',
      avatar: '/devs/justine.png',
      bio: 'Handles design and frontend functionality.',
    },
    {
      name: 'Sheena Mechaela Basiga',
      role: 'Project Manager',
      email: 'sheena.devs@example.com',
      avatar: '/devs/jerlyn.png',
      bio: 'Coordinates development and stakeholder needs.',
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Placeholder for backend
  };

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
  };

  const handleCloseSnackbar = () => {
    setCopied(false);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Left Sidebar */}
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
            Help & Support
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Need assistance? We’ve got you covered.
          </Typography>
        </Box>

        <Tabs
          value={tabValue}
          onChange={(e, newVal) => setTabValue(newVal)}
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
          <Tab icon={<HelpOutlineIcon />} iconPosition="start" label="FAQs" />
          <Tab icon={<ContactSupportIcon />} iconPosition="start" label="Contact Developers" />
          <Tab icon={<InfoIcon />} iconPosition="start" label="System Guide" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#450001" mb={2}>
              Frequently Asked Questions
            </Typography>
            {[
              { q: 'How do I reset my password?', a: 'Go to User Management > Account Recovery tab.' },
              { q: 'Why am I redirected to a game?', a: 'Students are redirected to the Unity-based game.' },
              { q: 'Can I add multiple quiz modes?', a: 'Yes, in the Create Quiz section.' },
              { q: 'How do I upload certificates?', a: 'Go to File Management > Upload Learning Materials.' },
              { q: 'Where is the leaderboard?', a: 'Teachers can view it under the Leaderboard tab.' },
              { q: 'How to download reports?', a: 'Go to Reports > Analytics and click Export.' },
            ].map((faq, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold" color="#450001">{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">{faq.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Contact Form */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" color="#450001" mb={2}>
                Contact Developers
              </Typography>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" mb={2}>Send a message</Typography>
                <TextField
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel sx={{ fontSize: '0.9rem', fontWeight: 500, mb: 1 }}>
                  File Attachment (optional)
                </InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      borderColor: '#8E0000',
                      color: '#8E0000',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        borderColor: '#8E0000',
                      },
                    }}
                  >
                    Choose File
                    <input type="file" hidden name="file" onChange={handleChange} />
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    {form.file ? form.file.name : 'No file chosen'}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#8E0000', textTransform: 'none' }}
                  onClick={handleSubmit}
                >
                  Submit Message
                </Button>
              </Paper>
            </Box>

            {/* Developer Sidebar */}
            <Box sx={{ width: 320 }}>
              <Typography variant="h6" fontWeight="bold" color="#450001" mb={2}>
                Developer Team
              </Typography>
              {devs.map((dev, i) => (
                <Paper key={i} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', borderRadius: 2 }}>
                  <Avatar src={dev.avatar} sx={{ width: 48, height: 48, mr: 2 }} />
                  <Box>
                    <Typography fontWeight="bold">{dev.name}</Typography>
                    <Chip label={dev.role} size="small" sx={{ mt: 0.5, mb: 1, bgcolor: '#F5F5F5', color: '#8E0000', fontWeight: 500 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ fontSize: 16, mr: 0.5, color: '#8E0000' }} />
                      <Typography variant="caption" color="text.secondary">{dev.email}</Typography>
                      <IconButton size="small" onClick={() => handleCopy(dev.email)} sx={{ ml: 1 }}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Button
                      size="small"
                      onClick={() => setSelectedDev(dev)}
                      sx={{ mt: 1, textTransform: 'none', color: '#8E0000' }}
                    >
                      Preview
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#450001" mb={2}>
              System Guide & Usage
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700 }}>
              This platform allows Super Admins to oversee the system structure, Admins to manage users and track data,
              Teachers to create learning materials and quizzes, and Students to engage with a gamified Unity experience.
              <br /><br />
              Explore your dedicated sections and contact support if you need assistance at any time.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Email copied to clipboard"
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      {/* Dev Preview Modal */}
      <Modal open={Boolean(selectedDev)} onClose={() => setSelectedDev(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          {selectedDev && (
            <>
              <Avatar src={selectedDev.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold">{selectedDev.name}</Typography>
              <Chip label={selectedDev.role} size="small" sx={{ mt: 1, mb: 2, bgcolor: '#F5F5F5', color: '#8E0000', fontWeight: 500 }} />
              <Typography variant="body2" color="text.secondary">{selectedDev.bio}</Typography>
              <Button onClick={() => setSelectedDev(null)} sx={{ mt: 3, textTransform: 'none', color: '#8E0000' }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Help;
