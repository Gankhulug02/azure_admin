import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import AuthProvider from './context/AuthContext';
import CategoryProvider from './context/Category';
import AlertProvider from './context/Alert';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CategoryProvider>
              <AlertProvider>
                <ScrollToTop />
                <StyledChart />
                <Router />
              </AlertProvider>
            </CategoryProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
