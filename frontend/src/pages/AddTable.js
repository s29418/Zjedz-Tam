import {useState} from "react";
import {useParams} from "react-router-dom";

function AddTable() {
    const [seats, setSeats] = useState('');
    const [description, setDescription] = useState('');

    const restaurantId = useParams().id;

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

        const newTable = {
            seats: parseInt(seats),
            description: description || null,
            restaurant_id: restaurantId,
        };

        try {
            const response = await fetch(`http://localhost:8000/api/tables?restaurant_id=${restaurantId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTable),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.reload();
                // if (onSubmit) onSubmit(data);
            } else {
                alert("Błąd podczas dodawania stolika.");
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    }

    return (
        <div className="form-container-short">
            <div className="registrationForm">

                <h2 className="addrestaurant">Dodaj stolik</h2>
                <form onSubmit={handleSubmit}>

                    <label className="label" htmlFor="seats">Liczba miejsc:
                        <br/>
                        <input
                            type="number"
                            id="seats"
                            className="userInput"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            required
                        />
                    </label>

                    <label className="label" htmlFor="description">Opis (opcjonalnie):
                        <br/>
                        <input
                            type="text"
                            id="description"
                            className="userInput"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <button type="submit" className="submitButton">
                        Dodaj stolik
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddTable;