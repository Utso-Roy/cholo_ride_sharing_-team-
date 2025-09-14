import React from 'react';
import { Button } from 'primereact/button';

const Home = () => {

    
    return (
        <div>
            This is Home page
            <div className="p-4">
                <h1>PrimeReact Test</h1>
                <Button 
                    label="Click Me" 
                    icon="pi pi-check" 
                    severity="success"
                    className="!bg-amber-300 !border-none !shadow-none" 
                />
            </div>
        </div>
    );
};

export default Home;
