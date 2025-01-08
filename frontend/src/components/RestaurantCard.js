import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {

    return (
        <Link to={`/restaurants/${restaurant.restaurant_id}`}>
            <div className="restaurant-card">
                <h3 className="restaurantSearchName">{restaurant.name}</h3>
                <img className="restaurantSearchImage"
                     src={restaurant.image ? `${restaurant.image}` : `/images/no-image.jpg`}
                     alt={restaurant.name}
                />

                <p className="shortDescription">{restaurant.short_description}</p>
            </div>
        </Link>
);
}


export default RestaurantCard;
