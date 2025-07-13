import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FirebaseContextProvider from './context/FirebaseContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FirebaseContextProvider>
      <App />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}/>
      <Toaster/>
    </FirebaseContextProvider>
    </BrowserRouter>
  </StrictMode>
)
