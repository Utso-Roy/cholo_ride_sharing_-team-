import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { RouterProvider } from 'react-router';
import router from './Routes/Routes';


// TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>


    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>


    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  </StrictMode>
);

