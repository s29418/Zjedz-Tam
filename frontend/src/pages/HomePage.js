import React, { useState, useEffect } from 'react';
import RestaurantList from '../components/RestaurantList';

const HomePage = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/restaurants")
            .then(response => response.json())
            .then(data => {
                console.log("Dane restauracji:", data);
                setRestaurants(data);
            })
            .catch(error => console.error("Błąd przy pobieraniu danych:", error));
    }, []);

    return (
        <div>
            <h1>Restauracje</h1>
            {restaurants.length > 0 ? (
                <RestaurantList restaurants={restaurants} />
            ) : (
                <p>Brak restauracji do wyświetlenia.</p>
            )}
        </div>
    );
};

export default HomePage;