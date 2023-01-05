import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary fixed-bottom px-5 container-fluid mt-lg-5">
         <p className="text-bg-primary"> Copyright Kevin Dillaerts - {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;