// TitleHeader.jsx
import React, { useEffect } from 'react';
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
  'Edit'
);
const titleHeader = {
  margin: '10px 0 0 0',
  padding: '10px',
  justifyContent: 'space-between',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
};
const modalSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '200px',
  height: '200px',
  padding: '50px',
  backgroundColor: '#fff',
  border: '2px solid #000',
  borderRadius: '30px'
};

function TitleHeader ({ useState, decks, setDecks, deckId, deckName }) {
  const navigate = useNavigate();
  const [presentationTitle, setPresentationTitle] = useState('');
  useEffect(() => {
    setPresentationTitle(deckName || 'Untitled Presentation');
  }, [deckName]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const handleEditTitle = () => {
    setEditModalOpen(true);
  };
  const handleDeletePresentation = () => {
    setDeleteConfirmationOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  const handleSaveTitle = (newTitle) => {
    setPresentationTitle(newTitle);
    setEditModalOpen(false);
  };
  const handleConfirmDelete = () => {
    // Filter out the current deck from the decks array
    const updatedDecks = decks.filter((deck) => deck.deckId !== deckId);

    // Update the decks state
    setDecks(updatedDecks);
    localStorage.removeItem('slides');
    localStorage.removeItem('deck');
    // localStorage.removeItem('decks');
    setDeleteConfirmationOpen(false);
    // Redirect to dashboard after deletion
    navigate('/dashboard');
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };
  const backMethod = () => {
    localStorage.removeItem('slides');
    localStorage.removeItem('deck');
    // localStorage.removeItem('decks');
    navigate('/Dashboard');
  };
  return (
    <>
      <div style={titleHeader}>
        <Button variant="contained" onClick={() => backMethod()}>
          <BackIcon />
        </Button>
        <div
          className="title"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Title of the presentation */}
          <h1>{presentationTitle}</h1>

          {/* editing title */}
          <Button variant="outlined" onClick={handleEditTitle}>
            <EditIcon />
          </Button>
        </div>
        <Button variant="contained" onClick={handleDeletePresentation}>
          <TrashIcon />
        </Button>
      </div>
      {/* Modal for editing presentation title */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <div style={modalSx}>
          <h2>Edit Presentation Title</h2>
          <TextField
            id="presentation-title"
            label="Presentation Title"
            variant="outlined"
            defaultValue={presentationTitle}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() =>
              handleSaveTitle(
                document.getElementById('presentation-title').value
              )
            }
          >
            Save
          </Button>
        </div>
      </Modal>
      {/* Confirmation modal for deleting presentation */}
      <Modal open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <div style={modalSx}>
          <h2>Are you sure?</h2>
          <div>
            <Button variant="contained" onClick={handleConfirmDelete}>
              Yes
            </Button>
            <Button variant="contained" onClick={handleCancelDelete}>
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TitleHeader;
