import { Link } from "react-router-dom";
import {UserContext} from '../context/UserContext';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";

function RestaurantCard({ restaurant }) {

    const { isAdmin } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8000/api/restaurants/${restaurant.restaurant_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            navigate('/');
            window.location.reload();
        }
    }

    return (
        <div className="restaurant-card">

            <Link to={`/restaurants/${restaurant.restaurant_id}`}>
                <div >
                    <h3 className="restaurantSearchName">{restaurant.name}</h3>
                    <img className="restaurantSearchImage"
                         src={restaurant.image ? `${restaurant.image}` : `/images/no-image.jpg`}
                         alt={restaurant.name}
                    />

                    <p className="shortDescription">{restaurant.short_description}</p>


                </div>
            </Link>
            {isAdmin && (
                <div>
                    <button className="adminButton2"
                            onClick={() => navigate(`/restaurants/${restaurant.restaurant_id}/edit`)}>Edytuj
                    </button>
                    <br/>
                    <button className="adminButton2" onClick={() => handleDelete()}>Usuń</button>
                </div>
            )}
        </div>
    );
}


export default RestaurantCard;
