import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function EditMenuItemForm({ onSubmit }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);

    const { id: restaurantId, itemId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch(`http://localhost:8000/api/menus/categories/${restaurantId}`);
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);

                const itemResponse = await fetch(`http://localhost:8000/api/menus/items/item/${itemId}`);
                const itemData = await itemResponse.json();
                setName(itemData.name || "");
                setCategoryId(itemData.category_id || "");
                setDescription(itemData.description || "");
                setPrice(itemData.price || "");
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, [restaurantId, itemId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !categoryId || !price) {
            alert("Proszę uzupełnić wszystkie wymagane pola.");
            return;
        }

        const updatedItem = {
            name,
            category_id: categoryId,
            description: description || null,
            price: parseFloat(price),
        };

        try {
            const response = await fetch(
                `http://localhost:8000/api/menus/items/${itemId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedItem),
                }
            );

            const data = await response.json();
            if (response.ok) {
                if (onSubmit) onSubmit();
            } else {
                alert(data.error || "Błąd podczas aktualizacji pozycji.");
            }
        } catch (error) {
            console.error("Błąd przy aktualizacji pozycji menu:", error);
        }
    };


    return (
        <div className="form-container">
            <div className="registrationForm">

                <div className="editForm">
                    <h2 className="addrestaurant">Edytuj pozycję w Menu:</h2>

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
                            Zaktualizuj pozycję
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default EditMenuItemForm;
