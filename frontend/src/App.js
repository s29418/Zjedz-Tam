import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import RestaurantDetails from "./pages/RestaurantDetails";

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                    {/*<Route path="/search" element={<SearchPage />} />*/}
                    {/*<Route path="/about" element={<AboutPage />} />*/}
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
