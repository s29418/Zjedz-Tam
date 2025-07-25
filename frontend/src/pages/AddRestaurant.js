import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddRestaurant() {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [addError, setAddError] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        if (name.length < 3) {
            setAddError("Nazwa restauracji musi mieć co najmniej 3 znaki.");
            return false;
        }

        if (city.length < 3) {
            setAddError("Nazwa miasta musi mieć co najmniej 3 znaki.");
            return false;
        }

        if (address.length < 3) {
            setAddError("Adres restauracji musi mieć co najmniej 3 znaki.");
            return false;
        }

        return true;
    }

    const addRestaurant = async (e) => {
        e.preventDefault();

        const restaurantData = {
            name: name,
            city: city,
            address: address,
            phoneNumber: phoneNumber,
            description: description,
            shortDescription: shortDescription,
            photo: photo,
        }

        if (validateForm()) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8000/api/restaurants/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(restaurantData),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("Dodano restauracje.", data.message);
                    navigate("/");
                } else {
                    setAddError(data.error || "Wystąpił błąd podczas dodawania restauracji.");
                    console.error("Błąd podczas dodawania restauracji", data.error);
                }
            } catch (error) {
                console.error("Błąd :", error);
                setAddError("Nie udało się połączyć z serwerem.");
            }
        }
    }

    return (
        <div>
            <h2 className="addrestaurant">Dodaj restauracje</h2>

            <div className="form-container-short">

                <div className="registrationForm">
                    <form onSubmit={addRestaurant}>
                        <label htmlFor="name">Nazwa restauracji:</label>
                        <input
                            type="text"
                            id="name"
                            className="userInput"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required/>
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
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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

                        <button className="submitButton" type="submit">Dodaj restaurację</button>
                        <span className="error-message">{addError}</span>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default AddRestaurant;