// TitleHeader.jsx
import React, { useState } from 'react';
import { Modal, TextField, Button, createSvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>,
  'Back'
);
const EditIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
    />
  </svg>,
  'Edit'
);
const TrashIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>,
  'Trash'
);

function TitleHeader({ decks, setDecks, deckId, deckName }) {
  const navigate = useNavigate();
  const [presentationTitle, setPresentationTitle] = useState(deckName || 'Untitled Presentation');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleSaveTitle = (newTitle) => {
    setPresentationTitle(newTitle);
    setEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    const updatedDecks = decks.filter((deck) => deck.deckId !== deckId);
    setDecks(updatedDecks);
    localStorage.removeItem('slides');
    localStorage.removeItem('deck');
    setDeleteConfirmationOpen(false);
    navigate('/dashboard');
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-300 p-4 bg-gray-100 shadow-md">
        <Button variant="contained" onClick={() => navigate('/dashboard')} className="flex items-center">
          <BackIcon />
        </Button>

        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{presentationTitle}</h1>
          <Button variant="outlined" onClick={() => setEditModalOpen(true)} className="flex items-center">
            <EditIcon />
          </Button>
        </div>

        <Button variant="contained" onClick={() => setDeleteConfirmationOpen(true)} color="secondary" className="flex items-center">
          <TrashIcon />
        </Button>
      </div>

      {/* Edit Title Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <div className="modalContent">
          <h2>Edit Presentation Title</h2>
          <TextField
            label="Presentation Title"
            variant="outlined"
            value={presentationTitle}
            onChange={(e) => setPresentationTitle(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={() => handleSaveTitle(presentationTitle)} className="mt-4">
            Save
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
        <div className="modalContent">
          <h2>Are you sure?</h2>
          <Button variant="contained" onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
          <Button variant="outlined" onClick={() => setDeleteConfirmationOpen(false)} color="secondary">
            No
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default TitleHeader;
