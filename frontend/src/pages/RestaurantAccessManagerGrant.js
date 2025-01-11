import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function RestaurantAccessManagerGrant() {
    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/roles");
                const data = await response.json();
                setRoles(data);
            } catch (error) {
                console.error("Błąd podczas pobierania ról:", error);
            }
        };

        fetchRoles();
    }, []);

    const handleGrantAccess = async (e) => {
        e.preventDefault();

        if (!email || !selectedRole) {
            setMessage("Proszę wypełnić wszystkie pola.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${id}/access/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ email, role: selectedRole }),
            });

            if (response.ok) {
                setMessage("Dostęp przyznany pomyślnie.");
                setEmail("");
                setSelectedRole("");
            } else {
                setMessage("Błąd podczas przyznawania dostępu.");
            }
        } catch (error) {
            console.error("Błąd podczas przyznawania dostępu:", error);
            setMessage("Błąd podczas przyznawania dostępu.");
        }
    };

    return (
        <div>
            <h2 className="addrestaurant">Przyznaj dostęp użytkownikowi</h2>
            <div className="form-container-short">
                <div className="registrationForm">

                    <form onSubmit={handleGrantAccess}>
                        <div>

                            <label className="label" htmlFor="email">E-mail użytkownika:</label>
                            <br/>
                            <input
                                type="email"
                                value={email}
                                className="userInput"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>

                        <div>
                            <label className="label" htmlFor="selectedRole">Wybierz rolę:</label>
                            <br/>

                                <select
                                    value={selectedRole}
                                    className="userInput"
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    required
                                >
                                    <option value="">-- Wybierz rolę --</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>

                        </div>

                        {message && <p>{message}</p>}
                        <button className="submitButton" type="submit">Przyznaj dostęp</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default RestaurantAccessManagerGrant;
