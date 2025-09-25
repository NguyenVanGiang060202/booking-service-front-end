import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom';
import {Theme} from "@radix-ui/themes"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Theme>
          <App />
        </Theme>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
