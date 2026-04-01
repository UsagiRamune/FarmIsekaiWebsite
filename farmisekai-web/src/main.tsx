import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext' // +++ ดึง Provider เข้ามา

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider> {/* +++ เอามาครอบ App ไว้ตรงนี้ */}
      <App />
    </LanguageProvider>
  </StrictMode>,
)