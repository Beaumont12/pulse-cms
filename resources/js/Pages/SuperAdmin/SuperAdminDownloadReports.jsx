import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Breadcrumbs, Link, IconButton
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

export default function SuperAdminDownloadReports() {
  const [tabValue, setTabValue] = useState(0);
  const tabLabels = ['Downloadable Reports', 'Upload Learning Materials'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', p:2 }}>
              {/* Sidebar */}
              <Box sx={{ width: 340, backgroundColor: '#fff', borderRight: '1px solid #eee'}}>
        {/* Title + Subtitle */}
        <Box sx={{ mb: 2, mt: 2, p: 2 }}>
          <Typography variant="h6" fontWeight="semi-bold" color="#450001">
            Content and File Management
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage downloadable content and uploaded resources
          </Typography>
        </Box>

         <Tabs
                 value={tabValue}
                 onChange={handleTabChange}
                 orientation="vertical"
                 scrollButtons="auto"
                 sx={{
                   '& .MuiTab-root': {
                     justifyContent: 'flex-start',
                     gap: 2,
                     px: 3,
                     py: 0,
                     m: 0,
                     alignItems: 'center',
                     color: '#8E0000',
                     textTransform: 'none',
                     fontSize: '0.99rem',
                     borderRadius: 2,
                   },
                   '& .Mui-selected': {
                     bgcolor: '#F5F5F5',
                     color: '#8E0000',
                     fontWeight: 'bold',
                     '& svg': {
                       fontSize: '1.8rem', // Make icon appear "bold"
                     },
                     '& .MuiTab-wrapper': {
                       fontWeight: 'bold',
                     },
                   },
                   '& .MuiTab-wrapper': {
                     flexDirection: 'row',
                     justifyContent: 'flex-start',
                   },
                 }}
               >
          <Tab icon={<DownloadOutlinedIcon fontSize="small" />} iconPosition="start" label="Downloadable Reports" />
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <Link underline="hover" color="inherit" href="#">
            Content and File Management
          </Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Grid container spacing={2}>
            {['Report 1', 'Report 2'].map((report, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Paper
                  elevation={2}
                  sx={{
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography fontWeight="bold" fontSize="0.95rem" color="#450001">
                    {report}
                  </Typography>
                  <IconButton color="primary">
                    <FileDownloadIcon />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" color="#450001" mb={1.5}>
                  Upload File
                </Typography>
                <Typography color="text.secondary" fontSize="0.9rem" mb={2}>
                  Upload learning materials such as handouts, syllabi, or certificates.
                </Typography>
                <Typography variant="body2" color="text.secondary">[Upload UI Placeholder]</Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Add category filters, tags, and expiration controls if needed.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
