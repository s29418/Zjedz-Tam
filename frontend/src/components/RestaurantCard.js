import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
    const [averageRating, setAverageRating] = useState(0);
    const [numberOfReviews, setNumberOfReviews] = useState(0);

    useEffect(() => {

        const fetchAverageRating = async () => {
            try {
                const response = await fetch(`/api/restaurants/${restaurant.restaurant_id}/averageRating`);
                const data = await response.json();
                setAverageRating(data.averageRating || 0);
            } catch (error) {
                console.error("Błąd podczas pobierania średniej oceny:", error);
            }
        };


        const fetchNumberOfReviews = async () => {
            try {
                const response = await fetch(`/api/restaurants/${restaurant.restaurant_id}/numberOfReviews`);
                const data = await response.json();
                setNumberOfReviews(data.numberOfReviews || 0);
            } catch (error) {
                console.error("Błąd podczas pobierania liczby ocen:", error);
            }
        };

        fetchAverageRating();
        fetchNumberOfReviews();
    }, [restaurant.restaurant_id]);

    return (
        <Link to={`/restaurants/${restaurant.restaurant_id}`} className="restaurant-card-link">
            <div className="restaurant-card">
                <h3 className="restaurantSearchName">{restaurant.name}</h3>
                <img className="restaurantSearchImage"
                     src={restaurant.image ? `/images/${restaurant.image}` : `/images/no-image.jpg`}
                     alt={restaurant.name}
                />

                <div className="rating">
                    <img src="/images/gwiazdka.png" alt="Ocena"/>
                    <p>{averageRating} ({numberOfReviews})</p>
                </div>
                <p className="shortDescription">{restaurant.short_description}</p>
            </div>
        </Link>
);
}


export default RestaurantCard;
