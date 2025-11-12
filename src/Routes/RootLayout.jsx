import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const RootLayout = () => {
    return (
        <div>
            <div className='max-w-1280px mx-auto'>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;