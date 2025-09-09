import { routesConfig } from 'config/routes.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';

const router = createBrowserRouter(routesConfig);

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
