import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import AddSubject from './pages/AddSubject.jsx';
import DeleteSubject from './pages/DeleteSubject.jsx';
import EditSubject from './pages/EditSubject.jsx';
import ManageSubject from './pages/ManageSubject.jsx';
import CalendarView from './pages/CalendarView.jsx';
import Login from './components/Login.jsx';
import { auth, onAuthStateChanged, signOut ,provider, signInWithPopup} from './firebaseConfig.js'
import toast from 'react-hot-toast';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
    toast.custom((t) => (
        <div className="bg-base-100 p-4 rounded-lg shadow-lg">
        <p>Are you sure you want to logout?</p>
        <div className="flex justify-end gap-2 mt-3">
            <button 
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-sm btn-ghost"
            >
            Cancel
            </button>
            <button 
            onClick={() => {
                signOut(auth);
                toast.success("Logged out successfully.", { duration: 3000 });
                toast.dismiss(t.id);
            }}
            className="btn btn-sm btn-error"
            >
            Logout
            </button>
        </div>
        </div>
    ));
    };

    const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success("Signed in successfully!", { duration: 3000 });
    } catch (error) {
      toast.error("Failed to sign in.", { duration: 3000 });
      console.error(error);
    }
    };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-green-900 to-black px-6">
        <div className="max-w-md w-full bg-gray-900 bg-opacity-80 rounded-xl shadow-lg p-10 text-center">
          <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
            Target 75
          </h1>
          <p className="text-gray-300 mt-5 mb-8">
            Stay on top of your attendance goals. 
            Sign in to start tracking!
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-green-100 text-green-500 font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.1 0 5.9 1.2 8 3.1l6-6C34.8 3.3 29.7 1 24 1 14.9 1 7.2 6.6 4 14.1l7.4 5.8c1.5-4.6 5.7-10.4 12.6-10.4z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.5c0-1.7-.1-3.3-.4-4.8H24v9.1h12.7c-.6 3.4-3.1 6.3-6.6 7.4l7.4 5.8c4.3-4 6.8-9.8 6.8-17.5z"
              />
              <path
                fill="#FBBC05"
                d="M11.4 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.4-5.8C1.6 17.6 0 20.6 0 24s1.6 6.4 4 8.7l7.4-5.8z"
              />
              <path
                fill="#EA4335"
                d="M24 46c6.5 0 12-2.1 16-5.8l-7.7-6c-2.2 1.5-5.1 2.4-8.3 2.4-6.9 0-12.9-4.6-15-10.8l-7.4 5.8C7.3 42.7 14.9 46 24 46z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
    return (
        <div className="relative h-full w-full">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
            <button 
                onClick={handleLogout} 
                className="mt-2 bg-red-300 text-black px-3 py-1 rounded"
            >
                Logout
            </button>
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/addSubject" element={<AddSubject user={user} />} />
                <Route path="/deleteSubject/:id" element={<DeleteSubject user={user} />} />
                <Route path="/manageSubject" element={<ManageSubject user={user} />} />
                <Route path="/editSubject/:id" element={<EditSubject user={user} />} />
                <Route path="/calendarView/:id" element={<CalendarView user={user} />} />
            </Routes>
        </div>
    );
};

export default App;
