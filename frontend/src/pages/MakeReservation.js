import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function MakeReservation() {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [reservationStart, setReservationStart] = useState("");
    const [reservationDuration, setReservationDuration] = useState(1);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [openingHours, setOpeningHours] = useState({});
    const restaurantId = useParams().id;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setCustomerName(decoded.name || "");
            setCustomerEmail(decoded.email || "");
        }

        fetch(`http://localhost:8000/api/tables?restaurant_id=${restaurantId}`)
            .then(response => response.json())
            .then(data => setTables(data))
            .catch(error => console.error("Błąd:", error));

        fetch(`http://localhost:8000/api/restaurants/${restaurantId}`)
            .then(response => response.json())
            .then(data => setOpeningHours(data.opening_hours))
            .catch(error => console.error("Błąd:", error));
    }, [restaurantId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reservationStart || !selectedTable) {
            alert("Proszę uzupełnić wszystkie wymagane pola.");
            return;
        }

        const startTime = new Date(reservationStart);
        const endTime = new Date(startTime);
        startTime.setHours(startTime.getHours());
        endTime.setHours(startTime.getHours() + Number(reservationDuration));
        const endTimeString = endTime.toISOString().slice(0, 16);

        const reservationDay = startTime.toLocaleString('pl-PL', { weekday: 'long' });
        const formattedReservationDay = reservationDay.charAt(0).toUpperCase() + reservationDay.slice(1).toLowerCase();
        const opening = openingHours[formattedReservationDay];

        if (!opening || opening === "Zamknięte") {
            alert(`Restauracja jest zamknięta w dniu ${reservationDay}`);
            return;
        }

        const [openingTime, closingTime] = opening.split("-").map(time => time.trim());
        const [openHour, openMinute] = openingTime.split(":").map(num => parseInt(num));
        const [closeHour, closeMinute] = closingTime.split(":").map(num => parseInt(num));

        const openDate = new Date(startTime);
        openDate.setHours(openHour, openMinute, 0, 0);

        const closeDate = new Date(startTime);
        closeDate.setHours(closeHour, closeMinute, 0, 0);

        if (endTime < openDate || startTime < openDate || endTime > closeDate) {
            alert("Rezerwacja nie mieści się w godzinach otwarcia restauracji.");
            return;
        }

        console.log("Reservation start:", reservationStart);
        console.log("Reservation end:", endTimeString);

        const newReservation = {
            customer_name: customerName,
            customer_email: customerEmail,
            reservation_start: reservationStart,
            reservation_end: endTimeString,
            table_id: selectedTable,
            user_id: jwtDecode(localStorage.getItem("token")).id,
        };
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:8000/api/reservations?restaurant_id=${restaurantId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`},
                body: JSON.stringify(newReservation),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Rezerwacja została dodana pomyślnie!");
                window.location.reload();
            } else {
                alert(data.error || "Błąd podczas dokonywania rezerwacji.");
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    };

    return (
        <div className="form-container-short">
            <div className="registrationForm">

                <h2 className="addrestaurant">Zarezerwuj stolik</h2>
                <form onSubmit={handleSubmit}>

                    <label className="label" htmlFor="reservationStart">Data początkowa rezerwacji:
                        <br />
                        <input
                            type="datetime-local"
                            id="reservationStart"
                            className="userInput"
                            value={reservationStart}
                            onChange={(e) => setReservationStart(e.target.value)}
                            required
                        />
                    </label>

                    <label className="label" htmlFor="reservationDuration">Długość rezerwacji (w godzinach: minimalnie 1, maksymalnie 4):
                        <br />
                        <input
                            type="number"
                            id="reservationDuration"
                            className="userInput"
                            min="1"
                            max="4"
                            value={reservationDuration}
                            onChange={(e) => setReservationDuration(Number(e.target.value))}
                            required
                        />
                    </label>

                    <label className="label" htmlFor="table">Wybierz stolik:
                        <br />
                        <select
                            id="table"
                            className="userInput"
                            value={selectedTable}
                            onChange={(e) => setSelectedTable(e.target.value)}
                            required
                        >
                            <option value="">Wybierz stolik</option>
                            {tables.map((table) => (
                                <option key={table.table_id} value={table.table_id}>
                                    {`Miejsca: ${table.seats} ${table.description ? ` - ${table.description}` : ""}`}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit" className="submitButton">
                        Zarezerwuj
                    </button>

                </form>
            </div>
        </div>
    );
}

export default MakeReservation;
