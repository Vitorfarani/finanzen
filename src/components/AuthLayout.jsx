// src/components/AuthLayout.jsx
import React from 'react';
import { Box, Card, CardContent, Typography, useTheme, useMediaQuery } from '@mui/material';

export default function AuthLayout({ title, children }) {
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f7fa',
      }}
    >
      {isWide && (
        <Box
          component="img"
          src="/auth-illustration.svg"  // coloque uma ilustração SVG na /public
          alt="Finance Illustration"
          sx={{ width: 400, mr: 4 }}
        />
      )}

      <Card sx={{ width: 360, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" mb={2}>
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}
