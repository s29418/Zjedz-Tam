import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/restaurants/${id}`)
            .then(response => response.json())
            .then((data) => setRestaurant(data))
            .catch(error => console.error("Błąd przy pobieraniu danych:", error));
    }, [id]);

    if (!restaurant) return <p>Loading...</p>;

    const weekDaysOrder = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

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

            <Menu restaurantId={id} />
        </div>
    );

}

export default RestaurantDetails;