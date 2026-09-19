import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { TailoringProvider } from './context/TailoringContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TailoringProvider>
      <App />
    </TailoringProvider>
  </StrictMode>,
);
