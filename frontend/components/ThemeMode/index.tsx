'use client';
import * as React from 'react';
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';


export default function ThemeMode() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <button onClick={toggleTheme} className="flex items-center justify-center p-2">
        {theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
      </button>
    </ThemeProvider>
  );
}