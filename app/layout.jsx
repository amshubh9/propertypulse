// app/layout.jsx
import React from 'react'
import '@/assets/styles/globals.css'
import 'photoswipe/dist/photoswipe.css'
import Navbar from '@/components/Navbar'   // adjust path as needed
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext'
export const metadata = {
  title: 'PropertiesPulse | Find The Perfect Rental',
  description: 'find your dream rental property',
  keywords: 'rental, find rentals, find properties',
}

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
    <AuthProvider>
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
       <Footer/>
       <ToastContainer/>
      </body>
    </html>
    </AuthProvider>
    </GlobalProvider>
  )
}
export default MainLayout