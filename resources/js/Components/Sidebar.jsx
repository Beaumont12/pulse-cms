import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Typography, Divider, IconButton, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import logo from '../assets/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = {
  super_admin: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/superadmin/dashboard' },
    { text: 'Manage Users', icon: <PeopleIcon />, path: '/superadmin/manage-users' },
    { text: 'Manage Courses', icon: <LibraryBooksIcon />, path: '/superadmin/manage-courses' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/superadmin/view-reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/superadmin/settings' },
  ],
  admin: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Manage Teachers', icon: <PeopleIcon />, path: '/admin/manage-teachers' },
    { text: 'Manage Students', icon: <PeopleIcon />, path: '/admin/manage-students' },
    { text: 'Program CMS', icon: <LibraryBooksIcon />, path: '/admin/program-cms' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/admin/reports' },
  ],
  teacher: [
    { header: 'Manage' },
    { text: 'Quizzes', icon: <QuizIcon />, path: '/teacher/quizzes' },
    { text: 'Question Bank', icon: <LibraryBooksIcon />, path: '/teacher/question-bank' },
    { text: 'Courses', icon: <LibraryBooksIcon />, path: '/teacher/courses' },
    { text: 'Avatars', icon: <PeopleIcon />, path: '/teacher/avatars' },
    { header: 'Play' },
    { text: 'Active', icon: <AssessmentIcon />, path: '/teacher/active' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/teacher/reports' },
    { text: 'Leaderboard', icon: <LeaderboardIcon />, path: '/teacher/leaderboard' },
    { text: 'Participants', icon: <PeopleIcon />, path: '/teacher/participants' },
    { header: 'Product' },
    { text: 'Feedback', icon: <FeedbackIcon />, path: '/teacher/feedback' },
    { text: 'Help', icon: <HelpOutlineIcon />, path: '/teacher/help' },
  ],
};

export default function Sidebar({ role = 'super_admin' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = menuItems[role];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const sidebarContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box textAlign="center">
        <Avatar src={logo} sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }} />
        <Typography variant="h6" fontWeight="bold" color="#450001">Pulse</Typography>
        <Typography
          variant="caption"
          sx={{
            bgcolor: '#8E0000',
            color: '#FAFAFF',
            borderRadius: 8,
            px: 1.5,
            py: 0.2,
            fontWeight: 'bold',
            mt: 0.5,
            textTransform: 'capitalize',
          }}
        >
          {role.replace('_', ' ')}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List>
        {items.map((item, index) =>
          item.header ? (
            <Typography
              key={`header-${index}`}
              variant="caption"
              sx={{ pl: 3, pt: 1, pb: 0.5, fontWeight: 'bold', color: '#8E0000' }}
            >
              {item.header}
            </Typography>
          ) : (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            bgcolor: '#FAFAFF',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}
