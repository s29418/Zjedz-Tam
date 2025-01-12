import { jwtDecode } from "jwt-decode";

export const hasPermission = (restaurantId, levelOfAccess) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decoded = jwtDecode(token);

    return decoded.restaurantRoles.some(
        (role) =>
            String(role.restaurant_id) === String(restaurantId) &&
            role.RestaurantUserRoles_id === levelOfAccess
    );
};
