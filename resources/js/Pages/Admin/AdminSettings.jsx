import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Snackbar,
  Alert,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';

const AdminSettings = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [autoLogoutTime, setAutoLogoutTime] = useState(15);
  const [darkMode, setDarkMode] = useState(false);
  const [moduleAccess, setModuleAccess] = useState({
    quizzes: true,
    reports: true,
    analytics: true,
    leaderboard: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const sectionLabels = [
    "Role & Access Management",
    "Auto Logout Timer",
    "Audit Logs",
    "Email Settings",
    "Theme Options",
    "Manage Plugins/Modules",
  ];

  const sectionIcons = [
    <SecurityIcon />,
    <AccessTimeIcon />,
    <HistoryIcon />,
    <EmailOutlinedIcon />,
    <ColorLensOutlinedIcon />,
    <ExtensionOutlinedIcon />,
  ];


  const handleSave = () => {
    console.log("Saved settings:", {
      autoLogoutTime,
      darkMode,
      moduleAccess,
    });
    setOpenSnackbar(true);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 0:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Role & Access Management
            </Typography>
            {Object.entries(moduleAccess).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={
                  <Switch
                    checked={value}
                    onChange={(e) =>
                      setModuleAccess({
                        ...moduleAccess,
                        [key]: e.target.checked,
                      })
                    }
                  />
                }
                label={`Allow access to ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                sx={{ display: "block", mb: 1 }}
              />
            ))}
          </Paper>
        );
      case 1:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Auto Logout Timer
            </Typography>
            <TextField
              label="Idle Time Limit (minutes)"
              type="number"
              fullWidth
              value={autoLogoutTime}
              onChange={(e) => setAutoLogoutTime(Number(e.target.value))}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Audit Logs
            </Typography>
            <Typography variant="body2">
              • User "admin" added a new course (2025-04-17)<br />
              • User "mod" updated quiz #14 (2025-04-16)
            </Typography>
          </Paper>
        );
      case 3:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Email Settings
            </Typography>
            <TextField label="System Email" fullWidth sx={{ mb: 2 }} />
            <TextField
              label="Default Template"
              fullWidth
              multiline
              rows={4}
              placeholder="Enter your default email message..."
            />
          </Paper>
        );
      case 4:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Theme Options
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              }
              label="Enable Dark Mode"
            />
          </Paper>
        );
      case 5:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Manage Plugins / Modules
            </Typography>
            {["Analytics", "Leaderboard", "Reports"].map((plugin) => (
              <FormControlLabel
                key={plugin}
                control={
                  <Switch
                    checked={moduleAccess[plugin.toLowerCase()] ?? false}
                    onChange={(e) =>
                      setModuleAccess({
                        ...moduleAccess,
                        [plugin.toLowerCase()]: e.target.checked,
                      })
                    }
                  />
                }
                label={`Enable ${plugin}`}
                sx={{ display: "block", mb: 1 }}
              />
            ))}
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)", p: 2 }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 320,
          backgroundColor: "#fff",
          borderRight: "1px solid #eee",
        }}
      >
        <Box sx={{ mb: 2, mt: 2, px: 3 }}>
          <Typography variant="h6" fontWeight="semi-bold" color="#450001">
            Settings
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage access, modules, and UI settings
          </Typography>
        </Box>

        <Tabs
          value={selectedSection}
          onChange={(e, newVal) => setSelectedSection(newVal)}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTab-root": {
              justifyContent: "flex-start",
              gap: 2,
              px: 3,
              py: 1.5,
              m: 0,
              alignItems: "center",
              color: "#8E0000",
              textTransform: "none",
              fontSize: "0.99rem",
              borderRadius: 0,
              textAlign: "left",
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
            },
            "& .Mui-selected": {
              bgcolor: "#F5F5F5",
              color: "#450001",
              fontWeight: "bold",
              borderRight: "3px solid #8E0000",
              "& svg": {
                fontSize: "1.5rem",
              },
              "& .MuiTab-wrapper": {
                fontWeight: "bold",
              },
            },
            "& .MuiTab-wrapper": {
              flexDirection: "row",
              justifyContent: "flex-start",
            },
          }}
        >
          {sectionLabels.map((label, index) => (
            <Tab
              key={label}
              icon={sectionIcons[index]}
              iconPosition="start"
              label={label}
            />
          ))}
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, pl: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3, mt: 2 }}
        >
          <Link underline="hover" color="inherit" href="#">
            Settings
          </Link>
          <Typography color="text.primary">
            {sectionLabels[selectedSection]}
          </Typography>
        </Breadcrumbs>

        {renderSection()}

        <Divider sx={{ my: 3 }} />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#8E0000", textTransform: "none" }}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminSettings;
