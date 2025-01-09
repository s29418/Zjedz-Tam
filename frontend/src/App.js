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

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                        <Route path="/restaurants/:id/edit" element={<EditRestaurant />} />
                        <Route path="/addRestaurant" element={<AddRestaurant />} />

                        <Route path="/login" element={<Registration />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        {/*<Route path="/search" element={<SearchPage />} />*/}
                        {/*<Route path="/about" element={<AboutPage />} />*/}
                    </Routes>
                </main>
                <Footer />
            </Router>
        </UserProvider>
    );
};

export default App;
