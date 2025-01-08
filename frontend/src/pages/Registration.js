import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

function Registration() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerName, setRegisterName] = useState('');

    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const navigate = useNavigate();

    const { login } = useContext(UserContext);


    const validateLogin = () => {
        setLoginError('');
        if (loginPassword.length < 7 || loginPassword.length > 60) {
            setLoginError('Hasło musi mieć od 7 do 60 znaków.');
            return false;
        }
        return true;
    };


    const validateRegistration = () => {
        setRegisterError('');
        if (registerPassword.length < 7 || registerPassword.length > 60) {
            setRegisterError('Hasło musi mieć od 7 do 60 znaków.');
            return false;
        }
        if (registerPassword !== confirmPassword) {
            setRegisterError('Hasła muszą być takie same.');
            return false;
        }
        if (!registerName.trim()) {
            setRegisterError('Wprowadź swoje imię.');
            return false;
        }
        return true;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (validateLogin()) {
            const loginData = {
                email: loginEmail,
                password: loginPassword,
            };

            try {
                const response = await fetch("http://localhost:8000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);

                    login({ email: loginEmail, role: data.role });
                    navigate("/");
                } else {
                    const errorMessage = data?.error || "Niepoprawne dane logowania.";
                    console.error("Błąd logowania:", errorMessage);
                    setLoginError(errorMessage);
                }
            } catch (error) {
                console.error("Błąd podczas logowania:", error);
                setLoginError("Nie udało się połączyć z serwerem.");
            }
        }
    };


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (validateRegistration()) {

            const registerData = {
                username: registerName,
                email: registerEmail,
                password: registerPassword,
            };

            try {
                const response = await fetch("http://localhost:8000/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registerData),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("Zarejestrowano pomyślnie:", data.message);
                    navigate("/");

                } else {
                    console.error("Błąd rejestracji:", data.error);
                }
            } catch (error) {
                console.error("Błąd podczas rejestracji:", error);
            }
        }
    };


        return (
            <div className="form-container">

                <div className="registrationForm">

                    <h2>Logowanie</h2>
                    <form onSubmit={handleLoginSubmit}>

                        <label className="label" htmlFor="loginEmail">Email:</label>
                        <input
                            type="email"
                            id="loginEmail"
                            className="userInput"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                        />
                        <br/>

                        <label className="label" htmlFor="loginPassword">Hasło:</label>
                        <input
                            type="password"
                            id="loginPassword"
                            className="userInput"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />
                        <br/>

                        <button class="submitButton" type="submit">Zaloguj się</button>
                        <span className="error-message">{loginError}</span>

                    </form>
                </div>


                <div className="registrationForm">

                    <h2>Rejestracja</h2>
                    <form onSubmit={handleRegisterSubmit}>

                        <label className="label" htmlFor="registerName">Imię:</label>
                        <input
                            type="text"
                            id="registerName"
                            className="userInput"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                        />
                        <br/>

                        <label className="label" htmlFor="registerEmail">Email:</label>
                        <input
                            type="email"
                            id="registerEmail"
                            className="userInput"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                        />
                        <br/>

                        <label className="label" htmlFor="registerPassword">Hasło:</label>
                        <input
                            type="password"
                            id="registerPassword"
                            className="userInput"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                        />
                        <br/>

                        <label className="label" htmlFor="confirmPassword">Potwierdź hasło:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="userInput"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <br/>

                        <button class="submitButton" type="submit">Zarejestruj się</button>
                        <span className="error-message">{registerError}</span>

                    </form>
                </div>
            </div>
        );
    }

export default Registration;
