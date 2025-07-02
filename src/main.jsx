import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext'
import axios from 'axios';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserProvider> {/* ✅ App 전체를 감싸기 */}
      <App />
    </UserProvider>
  </StrictMode>,
)
