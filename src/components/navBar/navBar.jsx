import React from "react";
import '../../styles/navBar.css';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar__logo">
            <img src= {logo} alt="logo" />
            </div>
            <div className="navbar__menu">
                <Link to="/" className="navbar__menu-item">Home</Link>
                <Link to="/crewmate-creator" className="navbar__menu-item">Create Crewmate</Link>
                <Link to="/crewmates" className="navbar__menu-item">View Crewmates</Link>
            </div>
            <div className="navbar__auth">
                <Link to="/login" className="navbar__auth-item">Login</Link>
            </div>
        </div>
    );
}

export default NavBar;