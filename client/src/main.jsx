import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

import ScrollToTop from './components/aux_components/ScrollToTop.jsx';

// Estilos CSS
import './styles/tailwind.css';
import './styles/scrollbar.css';
import './styles/logoscarousel.css';

// Botón de scroll arriba
import { ScrollToTopButton } from './components/aux_components/buttons';

//////

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ScrollToTop />
                <ScrollToTopButton className="button-top" />
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
