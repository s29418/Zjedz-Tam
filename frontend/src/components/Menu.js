import React, { useState, useEffect} from "react";
import { hasPermission } from "../utils/permissions";
import {useNavigate} from "react-router-dom";

function Menu( {restaurantId} ) {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkPermission = () => {
            setIsAdmin(hasPermission(restaurantId, 2));
        };
        checkPermission();
    }, [restaurantId]);

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

    const handleEditCategory =  async (categoryId) => {
        const newName = prompt("Podaj nową nazwę kategorii");
        if (!newName) return;

        try {
            const response = await fetch(`http://localhost:8000/api/menus/categories/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categoryId, newName })
            });
            const data = await response.json();
            if (response.ok) {
                setCategories(prev =>
                    prev.map(cat => cat.id === categoryId ? { ...cat, name: newName } : cat)
                );
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Błąd przy edytowaniu kategorii:", error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę kategorię?")) return;

        try {
            const response = await fetch(`http://localhost:8000/api/menus/categories/${categoryId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (response.ok) {
                setCategories(prev => prev.filter(cat => cat.id !== categoryId));
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Błąd przy usuwaniu kategorii:", error);
        }
    }

    const handleAddCategory = async () => {
        try{
            const name = prompt("Podaj nazwę nowej kategorii");
            if (!name) return;

            const response = await fetch(`http://localhost:8000/api/menus/categories/${restaurantId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            const data = await response.json();
            if (response.ok) {
                window.location.reload();
            } else {
                alert(data.error);
            }
        }catch (error){
            console.error("Błąd przy dodawaniu kategorii:", error);
        }
    }

    const handleDeleteItem = async (itemId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę pozycję?")) return;

        try {
            const response = await fetch(`http://localhost:8000/api/menus/items/${itemId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });

            const data = await response.json();
            if (response.ok) {
                window.location.reload();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Błąd przy usuwaniu pozycji:", error);
        }
    };


    return (
        <div className="menu-section">
            <h2>Menu</h2>

            {isAdmin && (
                <div>
                    <button className="adminButton" style={{fontSize: "15px"}}
                            onClick={() => handleAddCategory()}>Dodaj
                        kategorię
                    </button>
                    <button className="adminButton" style={{fontSize: "15px"}}
                            onClick={() => navigate(`/restaurants/${restaurantId}/menus/add`)}>Dodaj
                        pozycję w Menu
                    </button>

                </div>
            )}
            <div className="categories">
                {categories.map(category => (
                    <div key={category.id} className="category-container">
                        <label>
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

                        {isAdmin && (
                            <div>
                                <button className="adminButton4"
                                        onClick={() => handleEditCategory(category.id)}>Zmień nazwę
                                </button>
                                <button className="adminButton4" style={{backgroundColor: "#B60606FF"}}
                                        onClick={() => handleDeleteCategory(category.id)}>Usuń
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <table className="menu-table">

                <tbody>
                <tr>
                    <th>Danie</th>
                    <th>Opis</th>
                    <th>Cena</th>
                </tr>
                </tbody>

                {menuItems.map(item => (

                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description || "Brak opisu"}</td>
                        <td>{item.price} zł</td>
                        {isAdmin && (
                            <div>
                                <button className="adminButton4"
                                        onClick={() => navigate(`/restaurants/${restaurantId}/menus/edit/${item.id}`)}>Edytuj
                                </button>
                                <button className="adminButton4" style={{backgroundColor: "#B60606FF"}}
                                        onClick={() => handleDeleteItem(item.id)}>Usuń
                                </button>
                            </div>
                        )}
                    </tr>



                ))}
            </table>

        </div>
    );

}

export default Menu;