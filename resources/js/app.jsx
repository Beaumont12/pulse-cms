import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingScreen from './components/LoadingScreen';
import { ErrorBoundary } from 'react-error-boundary'; // ✅

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

// ✅ fallback UI if a component crashes
function ErrorFallback({ error }) {
  return (
    <div style={{ padding: '2rem', color: 'red' }}>
      <h2>🚨 Something went wrong!</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isLoaded ? (
        <LoadingScreen onLoaded={() => setIsLoaded(true)} />
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
            <AppRoutes />
          </Router>
        </ErrorBoundary>
      )}
    </ThemeProvider>
  );
}

root.render(<App />);