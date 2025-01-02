import React, { useState, useEffect } from 'react';
import RestaurantList from '../components/RestaurantList';

const HomePage = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/restaurants")
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error("Błąd przy pobieraniu danych:", error));
    }, []);

    return (
        <div className="restaurantList">
            <h2>Restauracje</h2>
            <hr className="restaurantunderline"/>
            <RestaurantList restaurants={restaurants}/>
        </div>
    );
};

export default HomePage;