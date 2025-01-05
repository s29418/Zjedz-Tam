import React from 'react';
import {Link} from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = () => {

    const { user } = useUser();

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src="/images/zjedz-tam-logo.png" alt="Logo Strony"/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Przeglądaj</Link></li>
                    <li><Link to="/about">O nas</Link></li>
                    {user ? (
                        <li><Link to="/profile">Profil</Link></li>
                    ) : (
                        <li><Link to="/login">Logowanie</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
