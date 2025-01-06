import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p>Nie jesteś zalogowany!</p>;
    }

    return (
        <div>
            <h1>Witaj, {user.email}!</h1>
            <p>To jest Twój profil.</p>
        </div>
    );
};

export default ProfilePage;