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

export function TextComponent ({ useState, currentSlide, slides, setSlides }) {
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textAreaSize, setTextAreaSize] = useState(100);
  const [fontSize, setFontSize] = useState(1);
  const [textColor, setTextColor] = useState('#000000');
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

  const textBoxStyle = {
    textAlign: 'left',
    overflow: 'hidden',
    border: '1px solid grey',
    padding: '10px',
    margin: '10px',
    width: `${textAreaSize}px`,
    fontSize: `${fontSize}em`,
    color: textColor,
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
    padding: '10px',
    border: '1px solid lightblue',
  };

  // Function to handle the text input
  const handleTextInput = (event) => {
    setInputText(event.target.value);
  };

  const handleTextSubmit = () => {
    const newTextObject = {
      type: 'text',
      title: inputText,
      style: textBoxStyle,
    };

    const updatedSlide = {
      ...currentSlide,
      objects: [...currentSlide.objects, newTextObject]
    };

    const updatedSlides = slides.map((slide) =>
      slide.id === currentSlide.id ? updatedSlide : slide
    );

    setSlides(updatedSlides);
    setTextModalOpen(false);
    setInputText('');
  };
  return (
    <>
    <Button
      variant="outlined"
      style={sidebutton}
      onClick={() => setTextModalOpen(true)}
    >
      Text
    </Button>
    {/* Text input modal */}
    <Modal
      className="w3-modal-content w3-animate-opacity"
      open={textModalOpen}
      onClose={() => setTextModalOpen(false)}
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter your text
        </Typography>
        <Input
          type="text"
          value={inputText}
          onChange={handleTextInput}
          style={inputStyle}
          placeholder="Text"
        />
        <Input
          type="number"
          value={textAreaSize}
          onChange={(e) => setTextAreaSize(e.target.value)}
          style={inputStyle}
          placeholder="Text Area Size"
        />
        <Input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          style={inputStyle}
          placeholder="Font Size (em)"
        />
        <Input
          type="text"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          style={inputStyle}
          placeholder="Text Color (HEX)"
        />
        <ButtonGroup>
          <Button
            onClick={handleTextSubmit}
            style={{ ...buttonStyle, margin: ' 0 20px 0 0' }}
          >
            Submit
          </Button>
          <Button onClick={() => setTextModalOpen(false)} style={buttonStyle}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  </>
  );
}

export default TextComponent;
