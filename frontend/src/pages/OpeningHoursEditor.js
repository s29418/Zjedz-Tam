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

    const validateOpeningHours = (value) => {
        const timeRegex = /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/;
        const closedRegex = "zamknięte"
        if (timeRegex.test(value) || value.toString().toLowerCase() === closedRegex) {
            return true;
        } else {
            return false;
        }
    };

    const handleInputChange = (day, value) => {
        setOpeningHours((prev) => ({
            ...prev,
            [day]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        Object.entries(openingHours).forEach(([day, value]) => {
            if (!validateOpeningHours(value)) {
                window.location.reload();
                alert(`Nieprawidłowy format godzin otwarcia dla dnia ${day}.`);
            }
        });

        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${id}/opening-hours`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
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
                                    value={openingHours[day]}
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
