import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { hasPermission } from "../utils/permissions";

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/restaurants/${id}`)
            .then(response => response.json())
            .then((data) => setRestaurant(data))
            .catch(error => console.error("Błąd przy pobieraniu danych:", error));
    }, [id]);

    if (!restaurant) return <p>Loading...</p>;

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8000/api/restaurants/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            navigate('/');
            window.location.reload();
        }
    }

    const weekDaysOrder = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

    const handleReservationClick = () => {
        navigate(`/reservation/${id}`);
    };

    return (
        <div>
            {hasPermission(id, 2) ? (
                <div className="adminPannel">
                    <button className="adminButton" onClick={() => navigate(`/restaurants/${id}/edit`)}>Edytuj restauracje</button>
                    <button className="adminButton" onClick={() => navigate(`/restaurants/${id}/access`)}>Zarządzaj dostępem</button>
                    <button className="adminButton3" onClick={() => handleDelete()}>Usuń restauracje</button>
                </div>
            ) : null}

            <div className="restaurantcontent">

                <div className="left-panel">

                    <div className="restaurantimage">
                        <img
                            src={restaurant.image ? `${restaurant.image}` : `/images/no-image.jpg`}
                            alt={restaurant.name}
                        />
                    </div>

                    <div className="opening-hours">

                        <button className="reservationButton" onClick={handleReservationClick}>Zarezerwuj stolik
                        </button>

                        <h2>Godziny otwarcia:</h2>

                        {hasPermission(id, 2) ? (
                            <div>
                                <button className="adminButton" onClick={() => navigate(`/restaurants/${id}/opening-hours`)}>Edytuj godziny otwarcia</button>
                            </div>
                        ) : null}

                        <table className="menu-table">

                            <thead>
                            <tr>
                                <th>Dzień</th>
                                <th>Godziny</th>
                            </tr>
                            </thead>

                            <tbody>
                            {Object.entries(restaurant.opening_hours)
                                .sort(([dayA], [dayB]) => weekDaysOrder.indexOf(dayA) - weekDaysOrder.indexOf(dayB))

                                .map(([day, hours]) => (

                                    <tr key={day}>
                                        <td>{day}</td>
                                        <td>{hours}</td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>


                <div className="text-content">

                    <h1 className="restaurantname">{restaurant.name}</h1>
                    <hr className="restaurantunderline"/>
                    <p className="address">{restaurant.address}, {restaurant.city}</p>

                    {restaurant.phone_number ? (
                        <p className="shortDescription">Telefon: {restaurant.phone_number}</p>
                    ) : null}

                    <hr className="restaurantunderline2"/>
                    <p className="shortDescription">{restaurant.description}</p>

                </div>
            </div>

            <Menu restaurantId={id}/>

        </div>
    );

}

export default RestaurantDetails;