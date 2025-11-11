import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default RootLayout;