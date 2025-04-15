import React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Tooltip, Box, Typography
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
  NoteAltOutlined as QuizIcon,
  LeaderboardOutlined as LeaderboardIcon,
  FeedbackOutlined as FeedbackIcon,
  HelpOutline as HelpIcon,
  LibraryBooksOutlined as LibraryBooksIcon,
  AssessmentOutlined as AssessmentIcon,
  PlayArrowOutlined as PlayIcon,
  ClassOutlined as ClassIcon,
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

const baseItems = (role) => [
  { text: 'Dashboard', icon: <HomeIcon />, path: `/${role}/dashboard` },
  { text: 'Users', icon: <PersonIcon />, path: `/${role}/manage-users` },
  { text: 'Learning Management', icon: <ContentPasteIcon />, path: `/${role}/SuperAdminlearning-management` },
  { text: 'Reports', icon: <InsertChartIcon />, path: `/${role}/view-reports` },
  { text: 'Files', icon: <FolderIcon />, path: `/${role}/files` },
  { text: 'Notifications', icon: <NotificationsIcon />, path: `/${role}/notifications`, hasBadge: true },
  { text: 'Settings', icon: <SettingsIcon />, path: `/${role}/settings` },
  { text: 'Help', icon: <InfoIcon />, path: `/${role}/help` },
];

const teacherItems = [
  {
    label: 'Manage',
    items: [
      { text: 'Dashboard', icon: <HomeIcon />, path: '/teacher/dashboard' },
      { text: 'Quizzes', icon: <QuizIcon />, path: '/teacher/quizzes' },
      { text: 'Question Bank', icon: <LibraryBooksIcon />, path: '/teacher/question-bank' },
      { text: 'Courses', icon: <ClassIcon />, path: '/teacher/courses' },
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
  const role = localStorage.getItem("userRole") || 'super_admin';
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
        justifyContent: 'flex-start',
        position: 'fixed',
        left: 0,
        top: 64,
        zIndex: 1200,
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        borderRight: '1px solid #eee',
      }}
    >
      {role === 'teacher' && (
        <>
          {teacherItems.map((group, index) => (
            <React.Fragment key={index}>
              <Box sx={{ mb: 1 }}>
                {expanded && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#450001',
                      fontWeight: 600,
                      px: 2,
                      mb: 0.5,
                      mt: 2,
                      fontSize: '0.9rem',
                    }}
                  >
                    {group.label}
                  </Typography>
                )}

                {group.items.map((item, itemIndex) => (
                  <Tooltip key={itemIndex} title={!expanded ? item.text : ''} placement="right" arrow>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      selected={location.pathname === item.path}
                      sx={{
                        justifyContent: expanded ? 'flex-start' : 'center',
                        px: expanded ? 2 : 0,
                        py: 0.8,
                        borderRadius: 2,
                        alignItems: 'center',
                        bgcolor: location.pathname === item.path ? '#F5F5F5' : 'transparent',
                        color: location.pathname === item.path ? '#8E0000' : '#450001',
                        '&:hover': { bgcolor: '#F5F5F5' },
                        gap: expanded ? 1.5 : 0,
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: 'inherit',
                          justifyContent: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          mr: expanded ? 2 : 0,
                          transition: 'margin 0.3s ease',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {expanded && <ListItemText primary={item.text} />}
                    </ListItemButton>
                  </Tooltip>
                ))}
              </Box>

              {/* Divider shown only in collapsed view, except after the last group */}
              {!expanded && index < teacherItems.length - 1 && (
                <Box
                  sx={{
                    height: '1px',
                    backgroundColor: '#ccc',
                    opacity: 0.7,
                    mx: 2,
                    my: 1,
                  }}
                />
              )}
            </React.Fragment>
          ))}

        </>
      )}

      {role !== 'teacher' && (() => {
        const topItems = baseItems(role).slice(0, 5); // Dashboard to Files
        const bottomItems = baseItems(role).slice(5); // Notifications to Help

        return (
          <>
            {/* TOP ICONS */}
            <List sx={{ gap: 0.5 }}>
              {topItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Tooltip key={index} title={!expanded ? item.text : ''} placement="right" arrow>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      selected={isActive}
                      sx={{
                        justifyContent: expanded ? 'flex-start' : 'center',
                        px: expanded ? 2 : 0,
                        py: 0.8,
                        borderRadius: 2,
                        alignItems: 'center',
                        bgcolor: isActive ? '#F5F5F5' : 'transparent',
                        color: isActive ? '#8E0000' : '#450001',
                        '&:hover': { bgcolor: '#F5F5F5' },
                        gap: expanded ? 1.5 : 0,
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: 'inherit',
                          justifyContent: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          mr: expanded ? 2 : 0,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {expanded && <ListItemText primary={item.text} />}
                    </ListItemButton>
                  </Tooltip>
                );
              })}
            </List>

            {/* BOTTOM ICONS */}
            <Box sx={{ flexGrow: 1 }} /> {/* pushes the bottom items down */}
            <List sx={{ gap: 0.5, mb: 2 }}>
              {bottomItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Tooltip key={index} title={!expanded ? item.text : ''} placement="right" arrow>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      selected={isActive}
                      sx={{
                        justifyContent: expanded ? 'flex-start' : 'center',
                        px: expanded ? 2 : 0,
                        py: 0.8,
                        borderRadius: 2,
                        alignItems: 'center',
                        bgcolor: isActive ? '#F5F5F5' : 'transparent',
                        color: isActive ? '#8E0000' : '#450001',
                        '&:hover': { bgcolor: '#F5F5F5' },
                        gap: expanded ? 1.5 : 0,
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: 'inherit',
                          justifyContent: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          mr: expanded ? 2 : 0,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {expanded && <ListItemText primary={item.text} />}
                    </ListItemButton>
                  </Tooltip>
                );
              })}
            </List>
          </>
        );
      })()}
    </Box>
  );
}
