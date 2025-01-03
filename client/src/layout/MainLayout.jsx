import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className=' min-h-screen'>
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout