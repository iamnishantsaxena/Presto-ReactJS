import React from 'react';
import {
  Modal,
  Button,
  Box,
  Typography,
  Input,
  ButtonGroup
} from '@mui/material';
import { useMediaQuery } from 'react-responsive';

export function VideoComponent ({
  useState,
  currentSlide,
  slides,
  setSlides,
  decks
}) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });

  const sidebutton = {
    width: isPhone ? '100%' : '80%',
    padding: isPhone ? '5px 0' : '10px',
    margin: isPhone ? '10px 0' : '0 0 20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: isPhone ? '0px' : '1px solid #fff',
    borderBottom: isPhone ? '3px solid #000' : '0',
    borderRadius: isPhone ? '0px' : '10px',
    color: isPhone ? '#000' : 'white',
    backgroundColor: isPhone ? '#fff' : '#000'
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isPhone ? '60%' : '50%',
    height: isPhone ? '50%' : '60%',
    backgroundColor: '#fff',
    backdropFilter: 'blur(5px)',
    border: '2px solid #000',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const inputStyle = {
    fontSize: '1.5em',
    width: '60%',
    height: 'auto',
    margin: '0 10px 10px 0',
    padding: '5px'
  };

  const buttonStyle = {
    fontSize: '0.8em',
    padding: '10px'
  };
  // Function to handle the video URL input
  const handleVideoUrlInput = (event) => {
    setVideoUrl(event.target.value);
  };

  // Add this function to handle the video URL submission
  const handleVideoUrlSubmit = () => {
    const newVideoObject = {
      type: 'video',
      title: videoUrl
    };
    const updatedSlide = {
      ...currentSlide,
      objects: [...currentSlide.objects, newVideoObject]
    };

    const updatedSlides = slides.map((slide) =>
      slide.id === currentSlide.id ? updatedSlide : slide
    );

    setSlides(updatedSlides);
    setVideoModalOpen(false);
    setVideoUrl('');
  };
  return (
    <>
      <Button
        variant="outlined"
        style={sidebutton}
        onClick={() => setVideoModalOpen(true)}
      >
        Video
      </Button>
      <Modal
        className="w3-modal-content w3-animate-opacity"
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the URL of the video
          </Typography>
          <Input
            type="text"
            value={videoUrl}
            onChange={handleVideoUrlInput}
            style={inputStyle}
          />
          <ButtonGroup>
            <Button
              onClick={handleVideoUrlSubmit}
              style={{ ...buttonStyle, margin: ' 0 20px 0 0' }}
            >
              OK
            </Button>
            <Button
              onClick={() => {
                setVideoUrl('');
                setVideoModalOpen(false);
              }}
              style={{ ...buttonStyle, margin: ' 0 0 0 20px' }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
}

export default VideoComponent;
