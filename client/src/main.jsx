import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Estilos CSS
import './styles/tailwind.css';
import './styles/scrollbar.css';

//////

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
);
