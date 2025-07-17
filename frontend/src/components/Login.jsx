import React from 'react';
import { auth, provider, signInWithPopup } from '../firebaseConfig.js';
import toast from 'react-hot-toast';

const Login = ({ setUser }) => {
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);  // Pass user details to App or parent state
            toast.success(`Logged in as ${user.displayName}`);
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Failed to log in.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button 
                onClick={handleLogin} 
                className="bg-primary text-white px-4 py-2 rounded shadow"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;