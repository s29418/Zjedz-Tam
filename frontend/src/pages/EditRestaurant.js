import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRestaurant() {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [editError, setEditError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8000/api/restaurants/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setCity(data.city);
                    setAddress(data.address);
                    setPhone_number(data.phone_number || '');
                    setDescription(data.description || '');
                    setShortDescription(data.short_description || '');
                    setPhoto(data.image || '');
                } else {
                    setEditError("Nie udało się pobrać danych restauracji.");
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
                setEditError("Nie udało się połączyć z serwerem.");
            }
        };

        fetchRestaurant();
    }, [id]);

    const validateForm = () => {
        if (name.length < 3) {
            setEditError("Nazwa restauracji musi mieć co najmniej 3 znaki.");
            return false;
        }

        if (city.length < 3) {
            setEditError("Nazwa miasta musi mieć co najmniej 3 znaki.");
            return false;
        }

        if (address.length < 3) {
            setEditError("Adres restauracji musi mieć co najmniej 3 znaki.");
            return false;
        }

        return true;
    };

    const updateRestaurant = async (e) => {
        e.preventDefault();

        const restaurantData = {
            name,
            city,
            address,
            phone_number,
            description,
            shortDescription,
            photo,
            id,
        };

        if (validateForm()) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8000/api/restaurants/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(restaurantData),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("Zaktualizowano restaurację.", data.message);
                    navigate("/");
                } else {
                    setEditError(data.error || "Wystąpił błąd podczas aktualizacji restauracji.");
                    console.error("Błąd podczas aktualizacji restauracji", data.error);
                }
            } catch (error) {
                console.error("Błąd :", error);
                setEditError("Nie udało się połączyć z serwerem.");
            }
        }
    };

    return (
        <div>
            <h2 className="addrestaurant">Edytuj restaurację</h2>

            <div className="form-container-short">
                <div className="registrationForm">
                    <form onSubmit={updateRestaurant}>
                        <label htmlFor="name">Nazwa restauracji:</label>
                        <input
                            type="text"
                            id="name"
                            className="userInput"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <br/>

                        <label className="label" htmlFor="city">Miasto:</label>
                        <input
                            type="text"
                            id="city"
                            className="userInput"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <br/>

                        <label className="label" htmlFor="address">Adres:</label>
                        <input
                            type="text"
                            id="address"
                            className="userInput"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />

                        <label className="label" htmlFor="phoneNumber">Numer telefonu (opcjonalnie):</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="userInput"
                            value={phone_number}
                            onChange={(e) => setPhone_number(e.target.value)}
                        />
                        <br/>

                        <label className="label" htmlFor="description">Opis (opcjonalnie):</label>
                        <input
                            type="text"
                            id="description"
                            className="userInput"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br/>

                        <label className="label" htmlFor="shortDescription">Krótki opis (opcjonalnie):</label>
                        <input
                            type="text"
                            id="shortDescription"
                            className="userInput"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                        />
                        <br/>

                        <label className="label" htmlFor="photo">Link do zdjęcia (opcjonalnie):</label>
                        <input
                            type="text"
                            id="photo"
                            className="userInput"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                        <br/>

                        <button className="submitButton" type="submit">Zapisz zmiany</button>
                        <span className="error-message">{editError}</span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditRestaurant;
