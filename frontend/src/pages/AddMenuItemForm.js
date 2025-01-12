import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function AddMenuItemForm({ onSubmit }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);

    const restaurantId = useParams().id;

    useEffect(() => {
        fetch(`http://localhost:8000/api/menus/categories/${restaurantId}`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Błąd przy pobieraniu kategorii menu:", error);
            });
    }, [restaurantId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !categoryId || !price) {
            alert("Proszę uzupełnić wszystkie wymagane pola.");
            return;
        }

        if (isNaN(parseFloat(price))) {
            alert("Cena musi być liczbą.");
            return;
        }

        const newItem = {
            name,
            category_id: categoryId,
            description: description || null,
            price: parseFloat(price),
        };

        try {
            const response = await fetch(`http://localhost:8000/api/menus/items/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Pozycja została dodana!");
                setName("");
                setCategoryId("");
                setDescription("");
                setPrice("");
                if (onSubmit) onSubmit(data);
            } else {
                alert(data.error || "Błąd podczas dodawania pozycji.");
            }
        } catch (error) {
            console.error("Błąd przy dodawaniu pozycji:", error);
        }
    };

    return (
        <div className="form-container">
            <div className="registrationForm">
                <h2 className="addrestaurant">Dodaj pozycję w Menu:</h2>
                <form onSubmit={handleSubmit}>
                    <label className="label" htmlFor="name">
                        Nazwa:
                        <input
                            type="text"
                            name="name"
                            className="userInput"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="label" htmlFor="category">
                        Kategoria:
                        <select
                            name="category"
                            className="userInput"
                            required
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="" disabled>
                                Wybierz kategorię
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="label" htmlFor="description">
                        Opis:
                        <input
                            type="text"
                            name="description"
                            className="userInput"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label className="label" htmlFor="price">
                        Cena:
                        <input
                            type="number"
                            name="price"
                            className="userInput"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="submitButton">
                        Dodaj pozycję
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMenuItemForm;
