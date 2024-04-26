import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import Input from '@mui/material/Input';

// Define the inputStyle and buttonStyle variables
const inputStyle = {
  margin: '10px 0',
  padding: '5px',
};

const buttonStyle = {
  margin: '10px 0',
  padding: '5px',
};

export function ImageComponent ({
  useState,
  currentSlide,
  slides,
  setSlides,
  decks
}) {
  const [imageModalOpen, setImageModalOpen] = useState(false); // New state variable for image modal
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const [imageAreaSize, setImageAreaSize] = useState(100);
  const [imageSource, setImageSource] = useState('');
  const [imageDescription, setImageDescription] = useState('');

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
    width: isPhone ? '80%' : '70%',
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
  /* const ImageStyle = {
    width: isPhone ? '100px' : '200px',
    height: isPhone ? '100px' : '150px',
    cursor: 'pointer',
    margin: isPhone ? '0 20px 20px 0' : '0 20px 40px 0'
  }; */
  // Function to handle Image button click
  const handleImageClick = () => {
    setImageModalOpen(true);
  };

  // Function to handle image selection
  const handleImageSelect = (selectedImage) => {
    const newImageObject = {
      type: 'image',
      source: imageSource,
      alt: imageDescription,
      style: {
        width: `${imageAreaSize}px`,
        height: 'auto',
      },
    };
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
      style={sidebutton}
      onClick={handleImageClick}
    >
      Image
    </Button>
    {/* Image selection modal */}
    <Modal
      className="w3-modal-content w3-animate-opacity"
      open={imageModalOpen}
      onClose={() => setImageModalOpen(false)}
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select an image
        </Typography>
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
