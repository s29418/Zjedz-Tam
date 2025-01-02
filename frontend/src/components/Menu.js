import React, { useState, useEffect} from "react";

function Menu( {restaurantId} ) {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/menus/categories/${restaurantId}`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Błąd przy pobieraniu kategorii menu:", error));
    }, [restaurantId]);

    useEffect(() => {
        if (selectedCategory) {
            fetch(`http://localhost:8000/api/menus/items/${selectedCategory}`)
                .then(response => response.json())
                .then(data => setMenuItems(data))
                .catch(error => console.error("Błąd przy pobieraniu pozycji menu:", error));
        }
    }, [selectedCategory]);


    return (
        <div className="menu-section">
            <h2>Menu</h2>

            <div className="categories">
                {categories.map(category => (

                    <label key={category.id}>
                        <input
                            type="radio"
                            name="category"
                            className="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                        />
                        {category.name}
                    </label>

                ))}
            </div>

            <table className="menu-table">

                <tr>
                    <th>Danie</th>
                    <th>Opis</th>
                    <th>Cena</th>
                </tr>

                {menuItems.map(item => (

                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description || "Brak opisu"}</td>
                        <td>{item.price} zł</td>
                    </tr>

                ))}
            </table>

        </div>
    );

}

export default Menu;