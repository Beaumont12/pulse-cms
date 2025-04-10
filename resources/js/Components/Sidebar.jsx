import React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Tooltip, Badge, Box, Typography, Button
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
  PlayArrowOutlined as PlayIcon,
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

// Define the base items for the sidebar, which are common for all roles.
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

// Teacher-specific items with section grouping
const teacherItems = [
  {
    label: 'Manage',
    items: [
      { text: 'Quizzes', icon: <QuizIcon />, path: '/teacher/quizzes' },
      { text: 'Question Bank', icon: <LibraryBooksIcon />, path: '/teacher/question-bank' },
      { text: 'Courses', icon: <LibraryBooksIcon />, path: '/teacher/courses' },
      { text: 'Avatars', icon: <PersonIcon />, path: '/teacher/avatars' },
    ],
  },
  {
    label: 'Play',
    items: [
      { text: 'Active', icon: <PlayIcon />, path: '/teacher/active' },
      { text: 'Reports', icon: <AssessmentIcon />, path: '/teacher/reports' },
      { text: 'Leaderboard', icon: <LeaderboardIcon />, path: '/teacher/leaderboard' },
      { text: 'Participants', icon: <PersonIcon />, path: '/teacher/participants' },
    ],
  },
  {
    label: 'Product',
    items: [
      { text: 'Feedback', icon: <FeedbackIcon />, path: '/teacher/feedback' },
      { text: 'Help', icon: <HelpIcon />, path: '/teacher/help' },
    ],
  },
];

export default function Sidebar({ expanded }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole") || 'super_admin';  // Default to super_admin if not found

  // Determine the menu items based on the role
  const items = role === 'teacher' ? teacherItems : baseItems(role);

  const SIDEBAR_WIDTH = expanded ? 300 : 80;

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: 'calc(100vh - 64px)',
        backgroundColor: '#F9F9FC',
        padding: expanded ? '24px 16px' : '24px 8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Change to flex-start to reduce spacing
        position: 'fixed',
        left: 0,
        top: 64, // Make sure this matches your AppBar height
        zIndex: 1200,
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        borderRight: '1px solid #eee',
      }}
    >
      {/* Render Teacher-specific Groups (Manage, Play, Product) */}
      {role === 'teacher' && expanded && (
        <>
          {teacherItems.map((group, index) => (
            <Box key={index} sx={{ mb: 1 }}> {/* Reduced margin between sections */}
              {/* Section Title */}
              <Typography
                variant="h6"
                sx={{
                  color: '#450001',
                  fontWeight: 600,
                  px: 2,
                  mb: 0.5, // Reduced margin
                  mt: 2,
                  fontSize: '0.9rem', // Adjust font size to make it more compact
                }}
              >
                {group.label}
              </Typography>

              {/* Render Teacher-specific Items */}
              {group.items.map((item, itemIndex) => (
                item.isButton ? (
                  // For 'New Quiz' button
                  <ListItemButton
                    key={itemIndex}
                    onClick={() => navigate(item.path)}
                    sx={{
                      justifyContent: 'flex-start',
                      px: 2,
                      py: 0.8, // Reduced padding
                      borderRadius: 2,
                      alignItems: 'center',
                      bgcolor: '#8E0000',
                      color: '#FAFAFF',
                      '&:hover': { bgcolor: '#660200' },
                      gap: 1.5,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ) : (
                  // Normal items
                  <Tooltip key={itemIndex} title={!expanded ? item.text : ''} placement="right" arrow>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      selected={location.pathname === item.path}
                      sx={{
                        justifyContent: expanded ? 'flex-start' : 'center',
                        px: 2,
                        py: 0.8, // Reduced padding
                        borderRadius: 2,
                        alignItems: 'center',
                        bgcolor: location.pathname === item.path ? '#F5F5F5' : 'transparent',
                        color: location.pathname === item.path ? '#8E0000' : '#450001',
                        '&:hover': { bgcolor: '#F5F5F5' },
                        gap: 1.5,
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center' }}>
                        {item.icon}
                      </ListItemIcon>
                      {expanded && <ListItemText primary={item.text} />}
                    </ListItemButton>
                  </Tooltip>
                )
              ))}
            </Box>
          ))}
        </>
      )}

      {/* TOP ITEMS - Common for all roles */}
      {role !== 'teacher' && (
        <List sx={{ gap: 0.5 }}>
          {baseItems(role).map((item, index) => (
            <Tooltip key={index} title={!expanded ? item.text : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  justifyContent: expanded ? 'flex-start' : 'center',
                  px: 2,
                  py: 0.8, // Reduced padding
                  borderRadius: 2,
                  alignItems: 'center',
                  bgcolor: location.pathname === item.path ? '#F5F5F5' : 'transparent',
                  color: location.pathname === item.path ? '#8E0000' : '#450001',
                  '&:hover': { bgcolor: '#F5F5F5' },
                  gap: 1.5,
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: 'inherit', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                {expanded && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      )}
    </Box>
  );
}
