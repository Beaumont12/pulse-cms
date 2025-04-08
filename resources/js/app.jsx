import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route // ✅ this was missing
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingScreen from './components/LoadingScreen';
import { ErrorBoundary } from 'react-error-boundary';
import Login from './Pages/Auth/Login'; // ✅ also make sure this is imported
import GameRedirect from './Pages/Student/GameRedirect';
import PersistentLayout from './Layouts/PersistentLayout';

const theme = createTheme({
  palette: {
    primary: { main: '#450001' },
    background: { default: '#FAFAFF' },
  },
  typography: {
    fontFamily: `'Poppins', 'Figtree', sans-serif`,
  },
});

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
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/student/game" element={<GameRedirect />} />
              <Route path="/*" element={<PersistentLayout />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      )}
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);