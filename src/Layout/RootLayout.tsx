import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import MessengerButton from '../components/MessengerButton';
import { AuthContext } from '../Auth/AuthProvider';

const RootLayout = () => {
const {user} = useContext(AuthContext)

    return (
        <div>
            <div className="sticky top-0 z-50 bg-white ">
                {
                    user && user?.email ? (
                                <Navbar></Navbar>

                    ) : " "
                }
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
            <MessengerButton/>
        </div>
    );
};

export default RootLayout;