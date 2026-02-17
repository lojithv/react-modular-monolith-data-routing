import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import router from './routes.tsx'
import { authStore } from '@shared/auth/index.ts'

/**
 * Auto-login for development convenience.
 * Set VITE_AUTO_LOGIN=true in a .env.local file to skip the login screen.
 */
if (import.meta.env.VITE_AUTO_LOGIN === 'true') {
  authStore.loginAsMock();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
