import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.css';

const Home = () => <div><h2>Witamy w Zjedz Tam!</h2></div>;
const Login = () => <div><h2>Logowanie</h2></div>;

const App = () => {
  return (
      <Router>
        <Header />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </Router>
  );
};

export default App;
