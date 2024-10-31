import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, TextField } from '@mui/material/';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from uuid package
import AddIcon from '@mui/icons-material/Add';

const modalSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height: '300px',
  backgroundColor: '#fff',
  border: '2px solid #000',
  borderRadius: '30px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

function CreateNewDeck ({ decks, setDecks }) {
  const [open, setOpen] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [deckId, setDeckId] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to generate deckId
  const generateDeckId = () => setDeckId(uuidv4());

  const handleDeckNameChange = (event) => {
    setDeckName(event.target.value);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
          generateDeckId();
        }}
        style={{ margin: '0 0 0 20px' }}
      >
        <AddIcon />
        New Deck
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalSx}>
          <TextField
            id="DeckName"
            label="Deck Name"
            variant="outlined"
            value={deckName}
            onChange={handleDeckNameChange}
          />
          <br />
          <Link
            to={{
              pathname: '/presentation/new',
              search: `?deckid=${deckId}&deckname=${encodeURIComponent(deckName)}`,
              state: { decks, setDecks }
            }}
          >
            {/* Navigate to presentation page with deckId */}
            <Button variant="outlined">Create Deck</Button>
          </Link>
        </div>
      </Modal>
    </>
  );
}

export default CreateNewDeck;
