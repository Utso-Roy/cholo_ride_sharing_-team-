import React from 'react';
import { CNGApplyProvider } from '../context/cng';
import { Outlet } from 'react-router';


const CNGLayout = () => {
    return (
        <CNGApplyProvider>
            <Outlet/>
        </CNGApplyProvider>
    );
};

export default CNGLayout;