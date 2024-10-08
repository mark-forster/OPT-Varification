import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.jsx'
import { Toaster } from 'react-hot-toast'
import { ChakraProvider } from '@chakra-ui/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <Toaster position="top-center" toastOptions={{ duration: 2000 }}/>
    <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,

)