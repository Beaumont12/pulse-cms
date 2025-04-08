// ✅ Sidebar.jsx (Updated to lift "expanded" state to parent)
import React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Typography, IconButton, Tooltip, Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  ContentPaste as ContentPasteIcon,
  InsertChartOutlined as InsertChartIcon,
  Folder as FolderIcon,
  NotificationsNone as NotificationsIcon,
  SettingsOutlined as SettingsIcon,
  InfoOutlined as InfoIcon,
  Quiz as QuizIcon,
  Leaderboard as LeaderboardIcon,
  Feedback as FeedbackIcon,
  HelpOutline as HelpIcon,
  LibraryBooks as LibraryBooksIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

const baseItems = (role) => [
  { text: 'Dashboard', icon: <HomeIcon fontSize="small" />, path: `/${role}/dashboard` },
  { text: 'Users', icon: <PersonIcon fontSize="small" />, path: `/${role}/manage-users` },
  { text: 'Learning Management', icon: <ContentPasteIcon fontSize="small" />, path: `/${role}/learning-management` },
  { text: 'Reports', icon: <InsertChartIcon fontSize="small" />, path: `/${role}/view-reports` },
  { text: 'Files', icon: <FolderIcon fontSize="small" />, path: `/${role}/files` },
  { text: 'Notifications', icon: <NotificationsIcon fontSize="small" />, path: `/${role}/notifications`, hasBadge: true },
  { text: 'Settings', icon: <SettingsIcon fontSize="small" />, path: `/${role}/settings` },
  { text: 'Help', icon: <InfoIcon fontSize="small" />, path: `/${role}/help` },
];

const menuItems = {
  super_admin: baseItems('superadmin'),
  admin: baseItems('admin'),
  teacher: [
    { header: 'Manage' },
    { text: 'Quizzes', icon: <QuizIcon fontSize="small" />, path: '/teacher/quizzes' },
    { text: 'Question Bank', icon: <LibraryBooksIcon fontSize="small" />, path: '/teacher/question-bank' },
    { text: 'Courses', icon: <LibraryBooksIcon fontSize="small" />, path: '/teacher/courses' },
    { text: 'Avatars', icon: <PersonIcon fontSize="small" />, path: '/teacher/avatars' },
    { header: 'Play' },
    { text: 'Active', icon: <AssessmentIcon fontSize="small" />, path: '/teacher/active' },
    { text: 'Reports', icon: <AssessmentIcon fontSize="small" />, path: '/teacher/reports' },
    { text: 'Leaderboard', icon: <LeaderboardIcon fontSize="small" />, path: '/teacher/leaderboard' },
    { text: 'Participants', icon: <PersonIcon fontSize="small" />, path: '/teacher/participants' },
    { header: 'Product' },
    { text: 'Feedback', icon: <FeedbackIcon fontSize="small" />, path: '/teacher/feedback' },
    { text: 'Help', icon: <HelpIcon fontSize="small" />, path: '/teacher/help' },
  ],
};

const sidebarVariants = {
  expanded: {
    width: 260,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
  collapsed: {
    width: 80,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
};

export default function Sidebar({ role = 'super_admin', expanded, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = menuItems[role];

  return (
    <motion.div
      variants={sidebarVariants}
      animate={expanded ? 'expanded' : 'collapsed'}
      style={{
        minHeight: '100vh',
        backgroundColor: '#F9F9FC',
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: expanded ? 16 : 8,
        paddingRight: expanded ? 16 : 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
        overflowX: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <Avatar src={logo} sx={{ width: 40, height: 40, marginRight: expanded ? 2 : 0 }} />
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Typography variant="h6" fontWeight="bold" color="#450001">Pulse</Typography>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: '#8E0000',
                  color: '#fff',
                  borderRadius: 1,
                  px: 1,
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                {role.replace('_', ' ')}
              </Typography>
            </motion.div>
          )}
          <IconButton onClick={onToggle} sx={{ ml: 'auto', color: '#450001' }}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <List sx={{ gap: 0.5 }}>
          {items.filter(item => !['Notifications', 'Settings', 'Help'].includes(item.text)).map((item, index) => (
            <Tooltip key={index} title={!expanded ? item.text : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  justifyContent: expanded ? 'flex-start' : 'center',
                  px: 2,
                  py: 1.2,
                  borderRadius: 2,
                  alignItems: 'center',
                  bgcolor: location.pathname === item.path ? '#F5F5F5' : 'transparent',
                  color: location.pathname === item.path ? '#8E0000' : '#450001',
                  '&:hover': { bgcolor: '#F5F5F5' },
                  gap: 1.5,
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center', display: 'flex', mr: expanded ? 1.5 : 0 }}>
                  {item.hasBadge ? (
                    <Badge color="error" variant="dot">{item.icon}</Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                {expanded && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <ListItemText primary={item.text} />
                  </motion.div>
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

        <List sx={{ mt: 4, gap: 0.5 }}>
          {items.filter(item => ['Notifications', 'Settings', 'Help'].includes(item.text)).map((item, index) => (
            <Tooltip key={index} title={!expanded ? item.text : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  justifyContent: expanded ? 'flex-start' : 'center',
                  px: 2,
                  py: 1.2,
                  borderRadius: 2,
                  alignItems: 'center',
                  bgcolor: location.pathname === item.path ? '#F5F5F5' : 'transparent',
                  color: location.pathname === item.path ? '#8E0000' : '#450001',
                  '&:hover': { bgcolor: '#F5F5F5' },
                  gap: 1.5,
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center', display: 'flex', mr: expanded ? 1.5 : 0 }}>
                  {item.hasBadge ? (
                    <Badge color="error" variant="dot">{item.icon}</Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                {expanded && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <ListItemText primary={item.text} />
                  </motion.div>
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </div>
    </motion.div>
  );
}
