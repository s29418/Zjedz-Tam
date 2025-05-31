import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem("token");

    const getUserIdFromToken = (token) => {
        console.log("token", token);
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            console.log("decoded", decoded.id);
            return decoded.id;
        } catch (error) {
            console.error("Błąd dekodowania tokena:", error);
            return null;
        }
    };

    const userId = getUserIdFromToken(token);
    console.log("userId", userId);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            console.error("Niepoprawna data:", dateString);
            return "Niepoprawna data";
        }

        return new Intl.DateTimeFormat('pl-PL', options).format(date);
    };

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8000/api/reservations/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Rezerwacje response:", data);

                    if (Array.isArray(data)) {
                        setReservations(data);
                    } else if (Array.isArray(data.reservations)) {
                        setReservations(data.reservations);
                    } else {
                        console.warn("Nieprawidłowa struktura danych:", data);
                        setReservations([]);
                    }
                })
                .catch((err) => console.error("Błąd pobierania rezerwacji:", err));
        }
    }, [userId]);

    if (!user) return <p>Nie jesteś zalogowany!</p>;

    return (
        <div>
            <h2>Twoje rezerwacje:</h2>
            {reservations.length === 0 ? (
                <p>Nie masz żadnych rezerwacji.</p>
            ) : (
                <ul className="reservation-ul">
                    {reservations.map((res) => (
                        <li className="reservation-li" key={res.reservation_id}>
                            <div>
                                <p>
                                    <strong>Restauracja:</strong> {res.restaurant_name}<br />
                                    <strong>Rezerwujący:</strong> {res.customer_name} ({res.customer_email}, id: {res.user_id})<br />
                                    <strong>Data:</strong> {formatDate(res.reservation_start)} - {formatDate(res.reservation_end)}<br />
                                    <strong>Stolik:</strong> Miejsca: {res.seats} ({res.description}, id: {res.table_id})<br />
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProfilePage;
