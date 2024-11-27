import React, { useState, useEffect } from "react";
import RestaurantList from "../components/RestaurantList";

function HomePage() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/restaurants")
            .then((response) => response.json())
            .then((data) => setRestaurants(data));
    }, []);

    return (
        <main>
            <h2>Przeglądaj Restauracje</h2>
            <RestaurantList restaurants={restaurants} />
        </main>
    );
}

export default HomePage;
