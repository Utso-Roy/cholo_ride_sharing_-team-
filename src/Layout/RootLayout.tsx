import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import MessengerButton from '../components/MessengerButton';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <MessengerButton/>
        </div>
    );
};

export default RootLayout;