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

    return (
        <div>
            <div className="restaurantcontent">

                <div className="restaurantimage">
                    <img
                         src={restaurant.image ? `/images/${restaurant.image}` : `/images/no-image.jpg`}
                         alt={restaurant.name}
                    />
                </div>

                <div className="text-content">

                    <h1 class="restaurantname">{restaurant.name}</h1>
                    <hr className="restaurantunderline"/>
                    <p className="description">{restaurant.description}</p>

                </div>

            </div>

            <Menu restaurantId={id} />
        </div>
    );

}

export default RestaurantDetails;