import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
            <h2>{restaurant.name}</h2>
            {/*<img src={`/images/${restaurant.image}`} alt={restaurant.name} />*/}
            <p>{restaurant.description}</p>
        </div>
    );
}

export default RestaurantDetails;