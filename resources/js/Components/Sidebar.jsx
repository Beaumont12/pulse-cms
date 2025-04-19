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
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

import { useNavigate, useLocation } from 'react-router-dom';

const baseItems = (role) => {
  const paths = {
    super_admin: {
      Users: 'SuperAdminManageUsers',
      Learning: 'SuperAdminQuizzes',
      Reports: 'SuperAdminUserProgress',
      Files: 'SuperAdminDownloadReports',
      Notifications: 'SuperAdminNotifications',
      Settings: 'SuperAdminSettings',
      Help: 'SuperAdminHelp',
    },
    admin: {
      Users: 'AdminManageUsers',
      Learning: 'AdminQuizzes',
      Reports: 'AdminUserProgress',
      Files: 'AdminDownloadReports',
      Notifications: 'AdminNotifications',
      Settings: 'AdminSettings',
      Help: 'AdminHelp',
    },
  };

  const p = paths[role] || paths.super_admin;

  return [
    { text: 'Dashboard', icon: <HomeIcon />, path: `/${role}/dashboard` },
    { text: 'Users', icon: <PersonIcon />, path: `/${role}/${p.Users}` },
    { text: 'Learning Management', icon: <LightbulbOutlinedIcon />, path: `/${role}/${p.Learning}` },
    { text: 'Reports', icon: <InsertChartIcon />, path: `/${role}/${p.Reports}` },
    { text: 'Files', icon: <FolderIcon />, path: `/${role}/${p.Files}` },
    { text: 'Notifications', icon: <NotificationsIcon />, path: `/${role}/${p.Notifications}`, hasBadge: true },
    { text: 'Settings', icon: <SettingsIcon />, path: `/${role}/${p.Settings}` },
    { text: 'Help', icon: <InfoIcon />, path: `/${role}/${p.Help}` },
  ];
};

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
  const SIDEBAR_WIDTH = expanded ? 320 : 100;

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: 'calc(100vh - 64px)',
        backgroundColor: '#F9F9FC',
        padding: expanded ? '26px 15px' : '24px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'fixed',
        left: 0,
        top: 64,
        zIndex: 1200,
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        borderRight: 'px solid #eee',
      }}
    >
      {role === 'teacher' ? (
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

                {group.items.map((item, itemIndex) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Tooltip key={itemIndex} title={!expanded ? item.text : ''} placement="right" arrow>
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
                            fontSize: isActive ? '1.8rem' : '1.5rem',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>

                        {expanded && (
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontWeight: isActive ? 'semi-bold' : 'regular',
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  );
                })}
              </Box>
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
      ) : (
        (() => {
          const items = baseItems(role);
          const topItems = items.slice(0, 5);
          const bottomItems = items.slice(5);

          return (
            <>
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
                            mt: .5
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {expanded && (
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontWeight: isActive ? 'bold' : 'normal',
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  );
                })}
              </List>

              <Box sx={{ flexGrow: 1 }} />
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
                        {expanded && (
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontWeight: isActive ? 'bold' : 'normal',
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  );
                })}
              </List>
            </>
          );
        })()
      )}
    </Box>
  );
}
