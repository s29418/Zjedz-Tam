import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTable() {
    const [seats, setSeats] = useState('');
    const [description, setDescription] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const navigate = useNavigate();
    const { tableId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/api/tables/${tableId}`)
            .then((response) => response.json())
            .then((data) => {
                setSeats(data.seats || '');
                setDescription(data.description || '');
                setRestaurantId(data.restaurant_id);
            })
            .catch((error) => console.error("Błąd podczas pobierania danych stolika:", error));
    }, [tableId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!seats) {
            alert("Proszę podać liczbę miejsc.");
            return;
        }

        if (isNaN(parseInt(seats))) {
            alert("Liczba miejsc musi być liczbą.");
            return;
        }

        const updatedTable = {
            seats: parseInt(seats),
            description: description || null,
            restaurant_id: restaurantId,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/api/tables/${tableId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ ...updatedTable, table_id: tableId }),
            });

            if (response.ok) {
                navigate(-1);
            } else {
                alert("Błąd podczas aktualizacji stolika.");
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    };

    return (
        <div className="form-container">
            <div className="registrationForm">
                <h2 className="addrestaurant">Edytuj stolik</h2>
                <form onSubmit={handleSubmit}>

                    <label className="label" htmlFor="seats">Liczba miejsc:
                        <input
                            type="number"
                            id="seats"
                            className="userInput"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    <label className="label" htmlFor="description">Opis:
                        <input
                            type="text"
                            id="description"
                            className="userInput"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <button type="submit" className="submitButton">
                        Zapisz zmiany
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditTable;
