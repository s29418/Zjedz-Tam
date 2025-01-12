import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditReservation() {
    const { id, reservationId } = useParams();
    const navigate = useNavigate();

    const [reservation, setReservation] = useState(null);
    const [tables, setTables] = useState([]);
    const [reservationStart, setReservationStart] = useState("");
    const [reservationDuration, setReservationDuration] = useState(1);
    const [selectedTable, setSelectedTable] = useState("");


    function formatDateForInput(datetime) {
        const date = new Date(datetime);
        const isoString = date.toISOString();
        return isoString.slice(0, 16);
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/reservations/${reservationId}`)
            .then((response) => response.json())
            .then((data) => {
                setReservation(data);
                setReservationStart(formatDateForInput(data.reservation_start));
                setReservationDuration(
                    (new Date(data.reservation_end) - new Date(data.reservation_start)) / (60 * 60 * 1000)
                );
                setSelectedTable(data.table_id);
            })
            .catch((error) => console.error("Błąd podczas pobierania rezerwacji:", error));

        fetch(`http://localhost:8000/api/tables?restaurant_id=${id}`)
            .then((response) => response.json())
            .then(data => setTables(data))
            .catch((error) => console.error("Błąd podczas pobierania stołów:", error));
    }, [id, reservationId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startTime = new Date(reservationStart);
        const endTime = new Date(startTime.getTime() + reservationDuration * 60 * 60 * 1000);
        const endTimeString = endTime.toISOString().slice(0, 16);

        const updatedReservation = {
            customer_name: reservation.customer_name,
            customer_email: reservation.customer_email,
            user_id: reservation.user_id,
            reservation_start: reservationStart,
            reservation_end: endTimeString,
            table_id: selectedTable,
        };

        try {
            const response = await fetch(`http://localhost:8000/api/reservations/${reservationId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedReservation),
            });

            if (response.ok) {
                alert("Rezerwacja została zaktualizowana!");
                navigate(`/restaurants/${id}`);
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Błąd podczas aktualizacji rezerwacji.");
            }
        } catch (error) {
            console.error("Błąd podczas aktualizacji rezerwacji:", error);
        }
    };

    if (!reservation || tables.length === 0) {
        return <p>Ładowanie danych...</p>;
    }

    return (
        <div className="form-container">
            <div className="registrationForm">

                <h2 className="addrestaurant">Edytuj Rezerwację</h2>
                <form onSubmit={handleSubmit}>

                    <label className="label">
                        Data i godzina rozpoczęcia:
                        <input
                            type="datetime-local"
                            value={reservationStart}
                            className="userInput"
                            onChange={(e) => setReservationStart(e.target.value)}
                            required
                        />
                    </label>
                    <label className="label">
                        Czas trwania (w godzinach):
                        <input
                            type="number"
                            min="1"
                            max="4"
                            value={reservationDuration}
                            className="userInput"
                            onChange={(e) => setReservationDuration(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label className="label">
                        Stół:
                        <select
                            value={selectedTable}
                            className="userInput"
                            onChange={(e) => setSelectedTable(Number(e.target.value))}
                            required
                        >
                            <option value="">Wybierz stół</option>
                            {tables.map((table) => (
                                <option key={table.table_id} value={table.table_id}>
                                    {table.description}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button className="submitButton" type="submit">Zapisz zmiany</button>
                </form>
            </div>
        </div>
    );
}

export default EditReservation;
