import React, {useState} from 'react';
import { Modal, Button, Box, Typography, Input } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { sideButtonStyle, modalStyle, inputStyle, buttonStyle } from '../css/sidebar';

export function ImageComponent({ currentSlide, slides, setSlides, onObjectSelect }) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const [imageAreaSize, setImageAreaSize] = useState(100);
  const [imageSource, setImageSource] = useState('');
  const [imageDescription, setImageDescription] = useState('');

  const handleImageClick = () => {
    setImageModalOpen(true);
  };

  const handleImageSelect = () => {
    const newImageObject = {
      type: 'image',
      source: imageSource,
      alt: imageDescription,
      style: {
        width: `${imageAreaSize}px`,
        height: 'auto',
      },
    };

    // Call the onObjectSelect to handle the new object
    onObjectSelect(newImageObject);

    // Optionally, update slides if needed
    const updatedSlide = {
      ...currentSlide,
      objects: [...currentSlide.objects, newImageObject]
    };
    const updatedSlides = slides.map((slide) =>
      slide.id === currentSlide.id ? updatedSlide : slide
    );

    setSlides(updatedSlides);
    setImageModalOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        style={sideButtonStyle(isPhone)}
        onClick={handleImageClick}
      >
        Image
      </Button>
      <Modal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
      >
        <Box sx={modalStyle(isPhone)}>
          <Typography variant="h6">Select an image</Typography>
          <Input
            type="number"
            value={imageAreaSize}
            onChange={(e) => setImageAreaSize(e.target.value)}
            style={inputStyle}
            placeholder="Image Area Size"
          />
          <Input
            type="text"
            value={imageSource}
            onChange={(e) => setImageSource(e.target.value)}
            style={inputStyle}
            placeholder="Image Source (URL or base64)"
          />
          <Input
            type="text"
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            style={inputStyle}
            placeholder="Image Description (alt tag)"
          />
          <Button onClick={handleImageSelect} style={buttonStyle}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ImageComponent;
