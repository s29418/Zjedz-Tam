import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import RestaurantDetails from "./pages/RestaurantDetails";
import Registration from "./pages/Registration";
import {UserProvider} from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import AddRestaurant from "./pages/AddRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import RestaurantAccessManager from "./pages/RestaurantAccessManager";
import RestaurantAccessManagerGrant from "./pages/RestaurantAccessManagerGrant";
import OpeningHoursEditor from "./pages/OpeningHoursEditor";
import AddMenuItemForm from "./pages/AddMenuItemForm";
import EditMenuItemForm from "./pages/EditMenuItemForm";
import Reservations from "./pages/Reservations";
import MakeReservation from "./pages/MakeReservation";
import EditReservation from "./pages/EditReservation";
import Tables from "./pages/Tables";
import AddTable from "./pages/AddTable";
import EditTable from "./pages/EditTable";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/restaurants/:id" element={<RestaurantDetails />} />

                        <Route path="/addRestaurant" element={<AddRestaurant />} />
                        <Route path="/restaurants/:id/edit" element={<EditRestaurant />} />

                        <Route path="/restaurants/:id/access" element={<RestaurantAccessManager />} />
                        <Route path="/restaurants/:id/grantAccess" element={<RestaurantAccessManagerGrant />} />

                        <Route path="/restaurants/:id/opening-hours" element={<OpeningHoursEditor />} />
                        <Route path="/restaurants/:id/menus/add" element={<AddMenuItemForm />} />
                        <Route path="/restaurants/:id/menus/edit/:itemId" element={< EditMenuItemForm />} />

                        <Route path="/restaurants/:id/tables" element={<Tables />} />
                        <Route path="/restaurants/:id/tables/add" element={<AddTable />} />
                        <Route path="/restaurants/:id/tables/edit/:tableId" element={<EditTable />} />

                        <Route path="/reservation/:id" element={< Reservations /> } />
                        <Route path="/reservation/:id/add" element={< MakeReservation /> } />
                        <Route path="/reservation/:id/edit/:reservationId" element={< EditReservation /> } />

                        <Route path="/login" element={<Registration />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </UserProvider>
    );
};

export default App;
