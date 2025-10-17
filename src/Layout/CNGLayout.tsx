import React from 'react';
import { CNGApplyProvider } from '../context/cng';
import { Outlet } from 'react-router';
import MessengerButton from '../components/MessengerButton';


const CNGLayout = () => {
    return (
        <CNGApplyProvider>
            <Outlet/>
             <MessengerButton />
        </CNGApplyProvider>
    );
};

export default CNGLayout;