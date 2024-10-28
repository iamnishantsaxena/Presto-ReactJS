import React, { useState } from 'react';
import { Modal, Button, Box, Typography, Input, ButtonGroup } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { sideButtonStyle, modalStyle, buttonStyle } from '../css/sidebar';

export function CodeComponent({ currentSlide, slides, setSlides, onObjectSelect }) {
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [codeText, setCodeText] = useState('');
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });

  const handleCodeSubmit = () => {
    const newCodeObject = {
      type: 'code',
      code: codeText,
    };

    // Call the onObjectSelect to handle the new object
    onObjectSelect(newCodeObject);

    // Optionally, update slides if needed
    const updatedSlide = {
      ...currentSlide,
      objects: [...currentSlide.objects, newCodeObject]
    };

    const updatedSlides = slides.map((slide) =>
      slide.id === currentSlide.id ? updatedSlide : slide
    );

    setSlides(updatedSlides);
    setCodeModalOpen(false);
    setCodeText('');
  };

  return (
    <>
      <Button
        variant="outlined"
        style={sideButtonStyle(isPhone)}
        onClick={() => setCodeModalOpen(true)}
      >
        Code
      </Button>
      <Modal
        open={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      >
        <Box sx={modalStyle(isPhone)}>
          <Typography variant="h6">Enter your code</Typography>
          <Input
            type="text"
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            style={{ marginBottom: '10px', width: '100%' }}
            placeholder="Code"
          />
          <ButtonGroup>
            <Button onClick={handleCodeSubmit} style={buttonStyle}>
              Submit
            </Button>
            <Button onClick={() => setCodeModalOpen(false)} style={buttonStyle}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
}

export default CodeComponent;
