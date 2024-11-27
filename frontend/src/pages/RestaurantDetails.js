import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurants/${id}`)
            .then((response) => response.json())
            .then((data) => setRestaurant(data));
    }, [id]);

    if (!restaurant) return <p>Ładowanie...</p>;

    return (
        <div>
            <h2>{restaurant.name}</h2>
            <img src={`/images/${restaurant.image}`} alt={restaurant.name} />
            <p>{restaurant.description}</p>
        </div>
    );
}

export default RestaurantDetails;
