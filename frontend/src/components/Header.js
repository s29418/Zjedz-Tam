import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import { useNavigate } from "react-router-dom";

const Header = () => {

    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src="/images/zjedz-tam-logo.png" alt="Logo Strony"/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Strona główna</Link></li>
                </ul>
            </nav>

            <nav className="profile-nav">
                <ul>

                    {user ? (
                        <>
                            <li><Link to="/profile">Profil</Link></li>
                            <li>
                                <button onClick={handleLogout} className="logout-button">
                                    Wyloguj się
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/login">Logowanie</Link></li>
                    )}

                </ul>
            </nav>
        </header>
    );
};

export default Header;
