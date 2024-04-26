import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  ButtonGroup,
  TextField
} from '@mui/material';
import { useMediaQuery } from 'react-responsive';

export function CodeComponent ({
  useState,
  currentSlide,
  slides,
  setSlides,
  decks
}) {
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [textareaSize, setTextareaSize] = useState('100%');
  const [fontSize, setFontSize] = useState(1);
  const [language, setLanguage] = useState('javascript');
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
  const buttonStyle = {
    fontSize: '0.8em',
    padding: '10px'
  };
  // Function to handle the code input
  const handleCodeInput = (event) => {
    setInputCode(event.target.value);
    detectLanguage(event.target.value);
  };

  const handleCodeSubmit = () => {
    const newCodeObject = {
      type: 'code',
      title: inputCode,
      language
    };

    const updatedSlide = {
      ...currentSlide,
      objects: [...currentSlide.objects, newCodeObject]
    };

    const updatedSlides = slides.map((slide) =>
      slide.id === currentSlide.id ? updatedSlide : slide
    );

    setSlides(updatedSlides);
    setCodeModalOpen(false);
    setInputCode('');
    setTextareaSize('');
    setFontSize('');
  };

  const detectLanguage = (code) => {
    if (code.includes('def') || code.includes('print')) {
      setLanguage('python');
    } else if (code.includes('function') || code.includes('var')) {
      setLanguage('javascript');
    } else if (code.includes('#include') || code.includes('printf')) {
      setLanguage('c');
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        style={sidebutton}
        onClick={() => setCodeModalOpen(true)}
      >
        Code
      </Button>
      {/* Code input modal */}
      <Modal
        className="w3-modal-content w3-animate-opacity"
        open={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter your code
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '10px 0 10px 0'
            }}
          >
            <TextField
              type="number"
              label="Textarea Size"
              value={textareaSize}
              onChange={(e) => setTextareaSize(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              type="number"
              label="Font Size (em)"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              style={{ margin: '10px 0 0 0' }}
            />
          </div>
          <textarea
            value={inputCode}
            onChange={handleCodeInput}
            style={{
              fontSize: `${fontSize}em`,
              width: `${textareaSize}%`,
              height: '50px',
              margin: '20px 0 20px 0',
              padding: '10px 10px 10px 10px'
            }}
          />
          <ButtonGroup>
            <Button
              onClick={handleCodeSubmit}
              style={{ ...buttonStyle, margin: ' 0 20px 0 0' }}
            >
              OK
            </Button>
            <Button
              onClick={() => {
                setInputCode('');
                setCodeModalOpen(false);
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

export default CodeComponent;
