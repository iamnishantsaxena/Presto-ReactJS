import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';

import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NewPresentation from './pages/Deck.jsx';
// import EditPresentation from './pages/EditDeck.jsx';

const getStore = async (token) => {
  try {
    const response = await axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching store:', error);
    return null;  // Return null to handle token expiration or unauthorized access
  }
};

const putStore = async (token, store) => {
  try {
    await axios.put(
      'http://localhost:5005/store',
      { store },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error updating store:', error);
  }
};

function App() {
  // Retrieve token and decks from localStorage or set default
  const [token, setToken] = React.useState(localStorage.getItem('token') || null);
  const [decks, setDecks] = React.useState(() => {
    const storedDecks = localStorage.getItem('decks');
    return storedDecks ? JSON.parse(storedDecks) : [];
  });

  // Function to update token in both state and localStorage
  const setTokenabstract = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Load store from server when component mounts
  React.useEffect(() => {
    if (token) {
      getStore(token).then((store) => {
        if (store) {
          const updatedDecks = store.decks || [];
          setDecks(updatedDecks);
          localStorage.setItem('decks', JSON.stringify(updatedDecks));
        } else {
          // Token invalid or expired, clear token and redirect to login
          setTokenabstract(null);
          localStorage.removeItem('token');
        }
      });
    }
  }, [token]);

  // Update server store and localStorage whenever `decks` changes
  React.useEffect(() => {
    if (token && decks) {
      putStore(token, { decks });
      localStorage.setItem('decks', JSON.stringify(decks));
    }
  }, [decks, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/presentation/edit"
          element={
            token ? (
              <NewPresentation
                token={token}
                setTokenFunction={setTokenabstract}
                decks={decks}
                setDecks={setDecks}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/presentation/new"
          element={
            token ? (
              <NewPresentation
                token={token}
                setTokenFunction={setTokenabstract}
                decks={decks}
                setDecks={setDecks}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard
                token={token}
                setTokenFunction={setTokenabstract}
                decks={decks}
                setDecks={setDecks}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={
            <Register token={token} setTokenFunction={setTokenabstract} />
          }
        />
        <Route
          path="/login"
          element={
            <Login token={token} setTokenFunction={setTokenabstract} />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
