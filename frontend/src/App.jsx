import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';

import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NewPresentation from './pages/Presentation.jsx';
import EditPresentation from './pages/EditDeck.jsx';

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
    return {};
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
    console.error('Error fetching store:', error);
  }
};

function App () {
  let lstoken = null;
  if (localStorage.getItem('token')) {
    lstoken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(lstoken);
  console.log('token', token);
  const setTokenabstract = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };
  console.log(token);
  let lsDecks = localStorage.getItem('decks');
  if (!lsDecks) {
    lsDecks = [];
  } else {
    lsDecks = JSON.parse(lsDecks);
  }
  const [decks, setDecks] = React.useState(lsDecks);
  React.useEffect(() => {
    getStore(token).then((store) => {
      if (Object.keys(store).length === 0) {
        store = { decks };
        // putStore(token, store);
      }
      if (!localStorage.getItem('decks')) {
        localStorage.setItem('decks', JSON.stringify(decks));
        setDecks(decks);
      }
    });
  }, []);
  React.useEffect(() => {
    putStore(token, decks);
    console.log('updated store', { decks });
    localStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);
  console.log('decks ', decks);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/presentation/edit"
            element={
              <EditPresentation
                token={token}
                setTokenFunction={setTokenabstract}
                decks={decks}
                setDecks={setDecks}
              />
            }
          />
          <Route
            path="/presentation/new"
            element={
              <NewPresentation
                token={token}
                setTokenFunction={setTokenabstract}
                decks={decks}
                setDecks={setDecks}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                token={token}
                setTokenFunction={setTokenabstract}
                decks={decks}
                setDecks={setDecks}
              />
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
          <Route exact path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
