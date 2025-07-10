import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Components/Router/router'
import AuthProvider from './Components/Authentication/Context/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='mt-18'>
    <RouterProvider router={router}></RouterProvider>
    </div>
    </AuthProvider>
    
  </StrictMode>,
)
