import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Components/Router/router'
import AuthProvider from './Components/Authentication/Context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <div className='pt-16 winkey bg-gradient-to-br from-base-100 via-base-300 to-base-200

'>
    <RouterProvider router={router}></RouterProvider>
    </div>
    </QueryClientProvider>
    </AuthProvider>
    
  </StrictMode>,
)
