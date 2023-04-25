import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './context/contextProvider'
import router from './router.jsx'
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <ToastContainer position="top-right" autoClose={4000} />
        <RouterProvider router={router} />

   </ContextProvider>
  </React.StrictMode>,
)
