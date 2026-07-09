import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import { ToastProvider } from './components/Toast'
import './styles/tokens.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ToastProvider>
          <App />
          <Analytics />
        </ToastProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
