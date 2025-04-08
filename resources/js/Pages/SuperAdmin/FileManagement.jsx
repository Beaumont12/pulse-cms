import React, { useState } from 'react';
import {
  Box, Typography, Tabs, Tab, Paper, Breadcrumbs, Link, IconButton
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Sidebar from '../../Components/Sidebar';

export default function FileManagement() {
  const [expanded, setExpanded] = useState(true);
  const SIDEBAR_WIDTH_EXPANDED = 260;
  const SIDEBAR_WIDTH_COLLAPSED = 80;
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['Downloadable Reports', 'Upload Learning Materials'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Sidebar role="super_admin" expanded={expanded} onToggle={() => setExpanded(prev => !prev)} />

      <Box
        sx={{
          flexGrow: 1,
          ml: expanded ? `${SIDEBAR_WIDTH_EXPANDED}px` : `${SIDEBAR_WIDTH_COLLAPSED}px`,
          transition: 'margin 0.4s ease-in-out',
          p: 3,
          backgroundColor: '#F9F9FC',
        }}
      >
        {/* Page Title and Subtitle */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="#450001">
            Content and File Management
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Manage downloadable content and uploaded resources
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link underline="hover" color="inherit" href="#">
              Content and File Management
            </Link>
            <Typography color="text.primary">
              {tabLabels[tabValue]}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Submenu as Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            backgroundColor: '#fff',
            borderRadius: 2,
            width: 240,
            float: 'left',
            mr: 4,
            height: '100%',
            '& .MuiTab-root': {
              justifyContent: 'flex-start',
              gap: 1.5,
              px: 2,
              alignItems: 'center',
              color: '#450001',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '0.95rem',
              minHeight: 60,
              lineHeight: 1.3,
              whiteSpace: 'normal',
            },
            '& .Mui-selected': {
              bgcolor: '#F5F5F5',
              color: '#8E0000',
            },
            '& .MuiTab-wrapper': {
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left',
            },
          }}
        >
          <Tab icon={<FileDownloadIcon fontSize="small" />} iconPosition="start" label="Downloadable Reports" />
          <Tab icon={<CloudUploadIcon fontSize="small" />} iconPosition="start" label="Upload Learning Materials" />
        </Tabs>

        {/* Content Display */}
        <Box sx={{ ml: 25 }}>
          {tabValue === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Report 1', 'Report 2'].map((report, index) => (
                <Paper key={index} elevation={1} sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography fontWeight="bold" fontSize="0.95rem" color="#450001">{report}</Typography>
                  <IconButton color="primary">
                    <FileDownloadIcon />
                  </IconButton>
                </Paper>
              ))}
            </Box>
          )}

          {tabValue === 1 && (
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography fontWeight="bold" color="#450001" mb={1.5}>Upload File</Typography>
              <Typography color="text.secondary" fontSize="0.9rem" mb={2}>
                Upload learning materials such as handouts, syllabi, or certificates.
              </Typography>
              {/* Future features here */}
              <Typography variant="body2" color="text.secondary">[Upload UI Placeholder]</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>Add category filters, tags, and expiration controls if needed.</Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}
