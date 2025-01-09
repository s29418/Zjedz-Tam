import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (userData, token) => {
        setUser(userData);
        setIsAdmin(userData.role === 2);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAdmin(parsedUser.role === 2);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, isAdmin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
