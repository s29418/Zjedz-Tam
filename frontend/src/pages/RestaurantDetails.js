import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { jwtDecode } from "jwt-decode";

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

    const isAdminForRestaurant = (restaurantId) => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        const decoded = jwtDecode(token);

        return decoded.restaurantRoles.some(
            (role) => String(role.restaurant_id) === String(restaurantId) && role.RestaurantUserRoles_id === 2
        );
    };

    const weekDaysOrder = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

    const handleReservationClick = () => {
        navigate(`/reservation/${id}`);
    };

    return (
        <div>
            {isAdminForRestaurant(id) ? (
                <div>
                    <button className="adminButton" onClick={() => navigate(`/restaurants/${id}/edit`)}>Edytuj</button>
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

                        <button className="reservationButton" onClick={handleReservationClick}>Zarezerwuj stolik</button>

                        <h2>Godziny otwarcia:</h2>

                        {restaurant.opening_hours ? (
                            <table className="menu-table">
                                <tbody>
                                <tr>
                                    <th>Dzień</th>
                                    <th>Godziny</th>
                                </tr>
                                </tbody>

                                {Object.entries(restaurant.opening_hours).map(([day, hours]) => (
                                    <tr key={day}>
                                        <td>{day}</td>
                                        <td>{hours}</td>
                                    </tr>
                                ))}


                            </table>
                        ) : (
                            <p>Brak danych</p>
                        )}

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