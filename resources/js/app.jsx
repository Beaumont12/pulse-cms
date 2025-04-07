import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingScreen from './components/LoadingScreen';

const theme = createTheme({
  palette: {
    primary: { main: '#450001' },
    background: { default: '#FAFAFF' },
  },
  typography: {
    fontFamily: `'Poppins', 'Figtree', sans-serif`,
  },
});

const root = ReactDOM.createRoot(document.getElementById('app'));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isLoaded ? (
        <LoadingScreen onLoaded={() => setIsLoaded(true)} />
      ) : (
        <Router>
          <AppRoutes />
        </Router>
      )}
    </ThemeProvider>
  );
}

root.render(<App />);