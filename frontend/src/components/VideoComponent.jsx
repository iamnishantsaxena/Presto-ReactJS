import React, {useState} from 'react';
import {
  Modal,
  Button,
  Box,
  Typography,
  Input,
  ButtonGroup
} from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { sideButtonStyle, modalStyle, inputStyle, buttonStyle } from '../css/sidebar';

export function VideoComponent ({
  currentSlide,
  slides,
  setSlides,
  decks
}) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  

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
        style={sideButtonStyle(isPhone)}
        onClick={() => setVideoModalOpen(true)}
      >
        Video
      </Button>
      <Modal
        className="w3-modal-content w3-animate-opacity"
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      >
        <Box sx={modalStyle(isPhone)}>
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
