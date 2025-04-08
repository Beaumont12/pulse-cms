import React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Tooltip, Badge, Box
} from '@mui/material';
import {
  HomeOutlined as HomeIcon,
  PersonOutline as PersonIcon,
  ContentPasteOutlined as ContentPasteIcon,
  InsertChartOutlined as InsertChartIcon,
  FolderOutlined as FolderIcon,
  NotificationsNone as NotificationsIcon,
  SettingsOutlined as SettingsIcon,
  InfoOutlined as InfoIcon,
  QuizOutlined as QuizIcon,
  LeaderboardOutlined as LeaderboardIcon,
  FeedbackOutlined as FeedbackIcon,
  HelpOutline as HelpIcon,
  LibraryBooksOutlined as LibraryBooksIcon,
  AssessmentOutlined as AssessmentIcon,
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

const baseItems = (role) => [
  { text: 'Dashboard', icon: <HomeIcon />, path: `/${role}/dashboard` },
  { text: 'Users', icon: <PersonIcon />, path: `/${role}/manage-users` },
  { text: 'Learning Management', icon: <ContentPasteIcon />, path: `/${role}/learning-management` },
  { text: 'Reports', icon: <InsertChartIcon />, path: `/${role}/view-reports` },
  { text: 'Files', icon: <FolderIcon />, path: `/${role}/files` },
  { text: 'Notifications', icon: <NotificationsIcon />, path: `/${role}/notifications`, hasBadge: true },
  { text: 'Settings', icon: <SettingsIcon />, path: `/${role}/settings` },
  { text: 'Help', icon: <InfoIcon />, path: `/${role}/help` },
];

const menuItems = {
  super_admin: baseItems('superadmin'),
  admin: baseItems('admin'),
  teacher: [
    { text: 'Quizzes', icon: <QuizIcon />, path: '/teacher/quizzes' },
    { text: 'Question Bank', icon: <LibraryBooksIcon />, path: '/teacher/question-bank' },
    { text: 'Courses', icon: <LibraryBooksIcon />, path: '/teacher/courses' },
    { text: 'Avatars', icon: <PersonIcon />, path: '/teacher/avatars' },
    { text: 'Active', icon: <AssessmentIcon />, path: '/teacher/active' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/teacher/reports' },
    { text: 'Leaderboard', icon: <LeaderboardIcon />, path: '/teacher/leaderboard' },
    { text: 'Participants', icon: <PersonIcon />, path: '/teacher/participants' },
    { text: 'Feedback', icon: <FeedbackIcon />, path: '/teacher/feedback' },
    { text: 'Help', icon: <HelpIcon />, path: '/teacher/help' },
  ],
};

export default function Sidebar({ role = 'super_admin', expanded, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = menuItems[role];
  const SIDEBAR_WIDTH = expanded ? 300 : 80;

  const topItems = items.filter(i => !['Notifications', 'Settings', 'Help'].includes(i.text));
  const bottomItems = items.filter(i => ['Notifications', 'Settings', 'Help'].includes(i.text));

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: 'calc(100vh - 64px)',
        backgroundColor: '#F9F9FC',
        padding: expanded ? '24px 16px' : '24px 8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        left: 0,
        top: 64, // ⬅️ make sure this matches your AppBar height
        zIndex: 1200,
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        borderRight: '1px solid #eee',
      }}
    >
      {/* TOP ITEMS */}
      <List sx={{ gap: 0.5 }}>
        {topItems.map((item, index) => (
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
              <ListItemIcon sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center', mr: expanded ? 1.5 : 0 }}>
                {item.hasBadge ? (
                  <Badge color="error" variant="dot">{item.icon}</Badge>
                ) : item.icon}
              </ListItemIcon>
              {expanded && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      {/* BOTTOM ITEMS */}
      <List sx={{ gap: 0.5 }}>
        {bottomItems.map((item, index) => (
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
              <ListItemIcon sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center', mr: expanded ? 1.5 : 0 }}>
                {item.hasBadge ? (
                  <Badge color="error" variant="dot">{item.icon}</Badge>
                ) : item.icon}
              </ListItemIcon>
              {expanded && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}
