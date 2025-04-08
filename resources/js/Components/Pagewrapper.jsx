import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const SIDEBAR_WIDTH_EXPANDED = 260;
const SIDEBAR_WIDTH_COLLAPSED = 80;

export default function PageWrapper({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Sidebar stays mounted */}
      <Sidebar
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
      />

      {/* Page content adjusts based on sidebar */}
      <Box
        sx={{
          flexGrow: 1,
          ml: {
            xs: 0,
            md: expanded
              ? `${SIDEBAR_WIDTH_EXPANDED}px`
              : `${SIDEBAR_WIDTH_COLLAPSED}px`,
          },
          transition: 'margin 0.4s ease-in-out',
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: '#F9F9FC',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
