import { Link } from "react-router-dom";
import {UserContext} from '../context/UserContext';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";

function RestaurantCard({ restaurant }) {

    const { isAdmin } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        console.log(id);
        const response = await fetch(`http://localhost:8000/api/restaurants/${id}`, {
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
                    <button className="adminButton2"
                            onClick={() => navigate(`/restaurants/${restaurant.restaurant_id}/access`)}>Zarządzaj dostępem
                    </button>
                    <br/>
                    <button className="adminButton2" style={{backgroundColor: "#B60606FF"}}
                            onClick={() => handleDelete(restaurant.restaurant_id)}>Usuń
                    </button>
                </div>
            )}
        </div>
    );
}


export default RestaurantCard;
