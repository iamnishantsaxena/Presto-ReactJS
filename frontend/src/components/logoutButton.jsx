import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export function Logout ({ token, setToken }) {
  const navigate = useNavigate();

  const logout = async () => {
    console.log('logout function called'); // add this
    try {
      await axios.post(
        'http://localhost:5005/admin/auth/logout',
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );
      setToken(null);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.log('error in logout function', err); // add this
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={logout}
        style={{ margin: '0 0 0 20px' }}
      >
        <LogoutIcon />
      </Button>
    </>
  );
}

export default Logout;
