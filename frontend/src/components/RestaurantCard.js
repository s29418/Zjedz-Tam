import React from "react";
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <img src={`/images/${restaurant.image}`} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <Link to={`/restaurant/${restaurant.id}`}>Zobacz więcej</Link>
        </div>
    );
}

export default RestaurantCard;
