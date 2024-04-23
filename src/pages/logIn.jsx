import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import PageLayout from "../components/pageLayout";
import '../styles/logIn.css'

const logIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to homepage
                window.location = '/'
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []); // Added missing closing brace here

    const handleLogin = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    const handleLoginGoogle = async () => {
        try{
            await signInWithRedirect(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <PageLayout>
            <div className="login-box">
                <h1>Login/Signup</h1>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <br />
                <button onClick={handleLogin}>Login</button>
                <div className="googleImg">
                <img src="https://i.imgur.com/yczPzHD.png" alt="Google Logo" className="googleImg" onClick={handleLoginGoogle}/>
                </div>
            </div>
        </PageLayout>
    )
}

export default logIn