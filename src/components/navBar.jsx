import React from "react";
import '../styles/navBar.css';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";


function NavBar() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to homepage
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const logOut = () => {
        try{
            signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="navbar">
            <div className="navbar__logo">
            <img src= {logo} alt="logo" />
            </div>
            <div className="navbar__menu">
                <Link to="/" className="navbar__menu-item">Home</Link>
                
            </div>
            <div className="navbar__auth">
                {isSignedIn ? <button className="navbar__auth-item" onClick={ logOut }>Logout</button> : 
                <Link to="/login" className="navbar__auth-item">Login</Link>}
                
            </div>
        </div>
    );
}

export default NavBar;