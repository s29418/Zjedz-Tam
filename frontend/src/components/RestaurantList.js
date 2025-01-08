import React, {useContext} from "react";
import RestaurantCard from "./RestaurantCard";
import {UserContext} from '../context/UserContext';
import {useNavigate} from "react-router-dom";

function RestaurantList({ restaurants }) {
    const { isAdmin } = useContext(UserContext);
    const navigate = useNavigate();

    const addRestaurant = () => {
        navigate(`/addrestaurant`);
    }

    return (
        <div>

            {isAdmin && (
                <div>
                    <button className="adminButton" onClick={addRestaurant}>Dodaj Restaurację</button>
                </div>
            )}


            <div>
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                ))}
            </div>

        </div>
    );
}

export default RestaurantList;
