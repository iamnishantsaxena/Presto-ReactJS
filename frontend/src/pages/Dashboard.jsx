import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Burgermenu from '../components/Burgermenu.jsx';
import Home from '../components/PresentationList.jsx';
import Footer from '../components/Footer.jsx';

const container = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#6183af',
  padding: '20px',
  borderRadius: '0px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  width: 'auto',
  height: '100vh',
  minHeight: '100%'
};

function Dashboard ({ token, setTokenFunction, decks, setDecks }) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  console.log(setAuth);

  if (token === null) {
    return <Navigate to="/login" />;
  }
  console.log(token);
  if (decks === null) {
    console.log('decks: ', decks);
  }
  return (
    <section style={{ container }}>
      <Burgermenu
        token={token}
        setTokenFunction={setTokenFunction}
        decks={decks}
        setDecks={setDecks}
        auth={auth}
        setAuth={setAuth}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
        setOpen={setOpen}
        theme={theme}
      />
      <Home decks={decks} setDecks={setDecks} />
      <Footer transparent={true} />
    </section>
  );
}

export default Dashboard;
