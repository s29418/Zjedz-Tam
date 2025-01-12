import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Tables() {
    const [tables, setTables] = useState([]);

    const restaurantId = useParams().id;

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/tables?restaurant_id=${restaurantId}`)
            .then(response => response.json())
            .then(data => setTables(data))
            .catch(error => console.error("Błąd:", error));
    }, [restaurantId]);

    const handleDelete = async (tableId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten stolik?")) return;

        const response = await fetch(`http://localhost:8000/api/tables/${tableId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            window.location.reload();
        }
    }

    return (
        <div>
            <h2 className="addrestaurant">Stoliki: </h2>

            <button className="adminButton" onClick={() => navigate(`/restaurants/${restaurantId}/tables/add`)}>Dodaj stolik</button>

            <table className="menu-table">
                <thead>
                <tr>

                    <th>Liczba miejsc</th>
                    <th>Opis</th>
                    <th>Akcje</th>

                </tr>
                </thead>

                <tbody>

                {tables.map(table => (

                    <tr key={table.table_id}>
                        <td>{table.seats}</td>
                        <td>{table.description}</td>

                        <td>
                            <button className="adminButton2" onClick={() => navigate(`/restaurants/${restaurantId}/tables/edit/${table.table_id}`)}>Edytuj</button>
                            <button className="adminButton2" style={{backgroundColor: "#B60606FF"}} onClick={() => handleDelete(table.table_id)}>Usuń</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default Tables;