import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';   
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css'; 
import { RouterProvider } from 'react-router';
import router from './Routes/Routes';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
