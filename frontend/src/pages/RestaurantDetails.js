import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

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

    const weekDaysOrder = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

    const handleReservationClick = () => {
        navigate(`/reservation/${id}`);
    };

    return (
        <div>
            <div className="restaurantcontent">

                <div className="left-panel">

                    <div className="restaurantimage">
                        <img
                            src={restaurant.image ? `/images/${restaurant.image}` : `/images/no-image.jpg`}
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
                    <p className="description">{restaurant.description}</p>

                </div>
            </div>

            <Menu restaurantId={id}/>

        </div>
    );

}

export default RestaurantDetails;