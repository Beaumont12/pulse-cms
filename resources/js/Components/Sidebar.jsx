import React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Tooltip, Box, Typography
} from '@mui/material';
import {
  HomeOutlined as HomeIcon,
  PersonOutline as PersonIcon,
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
    {
      text: 'Dashboard',
      icon: <HomeIcon />,
      path: role === 'admin'
        ? '/admin/AdminDashboard'
        : role === 'super_admin'
        ? '/super_admin/SuperAdminDashboard'
        : `/${role}/dashboard`
    },
    { text: 'Users', icon: <PersonIcon />, path: `/${role}/${p.Users}` },
    { text: 'Learning Management', icon: <LightbulbOutlinedIcon />, path: `/${role}/${p.Learning}` },
    { text: 'Reports', icon: <InsertChartIcon />, path: `/${role}/${p.Reports}` },
    { text: 'Files', icon: <FolderIcon />, path: `/${role}/${p.Files}` },
    { text: 'Notifications', icon: <NotificationsIcon />, path: `/${role}/${p.Notifications}` },
    { text: 'Settings', icon: <SettingsIcon />, path: `/${role}/${p.Settings}` },
    { text: 'Help', icon: <InfoIcon />, path: `/${role}/${p.Help}` },
  ];
};

const teacherItems = [
  {
    label: 'Manage',
    items: [
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

  const renderItem = (item, index) => {
    const isActive = location.pathname === item.path;
    return (
      <Tooltip key={index} title={!expanded ? item.text : ''} placement="right" arrow>
        <ListItemButton
          onClick={() => navigate(item.path)}
          selected={isActive}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 0.8,
            minHeight: 48,
            borderRadius: 2,
            alignItems: 'center',
            bgcolor: isActive ? '#F5F5F5' : 'transparent',
            color: isActive ? '#8E0000' : '#450001',
            '&:hover': { bgcolor: '#F5F5F5' },
            transition: 'all 0.3s ease-in-out',
            gap: 1.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: '40px',
              color: 'inherit',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              fontSize: isActive ? '1.8rem' : '1.5rem',
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
  };

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
        borderRight: '1px solid #eee',
      }}
    >
      {role === 'teacher' ? (
        <>
          {/* + New Quiz Button */}
          <Box sx={{ px: 2, mb: 2 }}>
            <Tooltip title={!expanded ? "New Quiz" : ""} placement="right" arrow>
              <button
                onClick={() => navigate('/teacher/quizzes/create')}
                style={{
                  backgroundColor: '#8E0000',
                  color: 'white',
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  width: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>+</span>
                {expanded && <span>New Quiz</span>}
              </button>
            </Tooltip>
          </Box>

          {teacherItems.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {expanded && (
                <Typography
                  variant="h6"
                  sx={{
                    color: '#450001',
                    fontWeight: 600,
                    px: 2,
                    mb: 0.5,
                    mt: 0,
                    fontSize: '0.9rem',
                  }}
                >
                  {group.label}
                </Typography>
              )}

              {group.items.map(renderItem)}

              {!expanded && groupIndex < teacherItems.length - 1 && (
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
        <>
          <List sx={{ gap: 0.5 }}>
            {baseItems(role).slice(0, 5).map(renderItem)}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <List sx={{ gap: 0.5, mb: 2 }}>
            {baseItems(role).slice(5).map(renderItem)}
          </List>
        </>
      )}
    </Box>
  );
}
