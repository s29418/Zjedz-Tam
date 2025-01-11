import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";

const weekDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

function OpeningHoursEditor( ) {
    const [openingHours, setOpeningHours] = useState({});

    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOpeningHours = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/restaurants/${id}`);
                const data = await response.json();
                setOpeningHours(data.opening_hours || {});
            } catch (error) {
                console.error("Błąd pobierania godzin otwarcia:", error);
            }
        };

        fetchOpeningHours();
    }, [id]);

    const handleInputChange = (day, value) => {
        setOpeningHours((prev) => ({
            ...prev,
            [day]: value || "Zamknięte",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${id}/opening-hours`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ opening_hours: openingHours }),
            });

            if (response.ok) {
                console.log("Godziny otwarcia zaktualizowane.");
                navigate(`/restaurants/${id}`);
            } else {
                alert("Błąd zapisu godzin otwarcia.");
            }
        } catch (error) {
            console.error("Błąd aktualizacji godzin otwarcia:", error);
        }
    };

    return (
        <div className="form-container">
            <div className="registrationForm">

                <h2 className="addrestaurant">Edycja godzin otwarcia</h2>
                <p className="shortDescription">Wprowadź godziny otwarcia dla każdego dnia tygodnia w formacie "HH:mm-HH:mm" lub "Zamknięte"</p>

                <form onSubmit={handleSubmit}>
                    {weekDays.map((day) => (
                        <div key={day}>
                            <label className="label">
                                {day}:
                                <input
                                    type="text"
                                    value={openingHours[day] || "Zamknięte"}
                                    className="userInput"
                                    onChange={(e) => handleInputChange(day, e.target.value)}
                                />
                            </label>
                        </div>
                    ))}
                    <button className="submitButton" type="submit" >Zapisz zmiany</button>
                </form>
            </div>
        </div>
    );
}

export default OpeningHoursEditor;
