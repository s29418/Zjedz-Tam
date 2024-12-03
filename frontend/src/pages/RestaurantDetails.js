import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/restaurants/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setRestaurant(data))
            .catch((error) => {
                console.error("Error fetching restaurant details:", error);
                setError(error.message);
            });
    }, [id]);

    if (error) return <p>Error: {error}</p>;
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