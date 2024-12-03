import React from "react";
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            {/*<img src={`/images/${restaurant.image}`} alt={restaurant.name} />*/}
            <h3 className="restaurantSearchName">{restaurant.name}</h3>
            <p>{restaurant.short_description}</p>
            <Link to={`/restaurants/${restaurant.restaurant_id}`}>Zobacz więcej</Link>
        </div>
    );
}

export default RestaurantCard;
