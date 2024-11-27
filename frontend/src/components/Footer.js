import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="logo">
                <Link to="/">
                    <img src="/images/logo2.png" alt="Logo Strony"/>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
