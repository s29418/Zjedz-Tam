import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

function RestaurantAccessManager() {
    const [accessList, setAccessList] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessList = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/restaurants/${id}/access`);
                const data = await response.json();
                setAccessList(data);
            } catch (error) {
                console.error("Błąd podczas pobierania listy dostępu:", error);
            }
        };

        fetchAccessList();
    }, [id]);

    const handleRevokeAccess = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${id}/access/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response.ok){
                window.location.reload();
            }
        } catch (error) {
            console.error("Błąd podczas usuwania dostępu:", error);
        }
    };

    return (
        <div>
            <h2>Menedżer dostępu do restauracji</h2>

            <button className="adminButton" onClick={() => navigate(`/restaurants/${id}/grantAccess`)}>Przyznaj dostęp</button>

            <table className="menu-table">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Rola</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {accessList.map((item) => (
                    <tr key={item.restaurant_user_id}>
                        <td>{item.email}</td>
                        <td>{item.roleName}</td>
                        <td>
                            <button className="adminButton2" onClick={() => handleRevokeAccess(item.restaurant_user_id)}>
                                Odbierz dostęp
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantAccessManager;
