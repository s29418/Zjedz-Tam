import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src="/images/logo2.png" alt="Logo Strony"/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Przeglądaj</Link></li>
                    <li><Link to="/about">O nas</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

// <div className="logo">
//     <a href="homepage.html">
//         <img src="/images/logo2.png" alt="Logo Strony"/>
//     </a>
// </div>
// <nav>
//     <ul>
//         <li><a href="../pages/HomePage.js">Home</a></li>
//         <li><a href="search.html">Przeglądaj</a></li>
//         <li><a href="about.html">O nas</a></li>
//     </ul>
// </nav>
