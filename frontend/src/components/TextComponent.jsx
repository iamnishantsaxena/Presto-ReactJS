import React, {useState} from 'react';
import { Modal, Button, Box, Typography, Input, ButtonGroup } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { sideButtonStyle, modalStyle, inputStyle, buttonStyle } from '../css/sidebar';

export function TextComponent({ currentSlide, slides, setSlides, decks, onObjectSelect }) {
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textAreaSize, setTextAreaSize] = useState(100);
  const [fontSize, setFontSize] = useState(1);
  const [textColor, setTextColor] = useState('#000000');
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });

  const handleTextSubmit = () => {
    const newTextObject = {
      type: 'text',
      title: inputText,
      style: {
        textAlign: 'left',
        overflow: 'hidden',
        border: '1px solid grey',
        padding: '10px',
        margin: '10px',
        width: `${textAreaSize}px`,
        fontSize: `${fontSize}em`,
        color: textColor,
      },
    };

    // Call the onObjectSelect to handle the new object
    onObjectSelect(newTextObject);

    // Optionally, update slides if needed
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
        style={sideButtonStyle(isPhone)}
        onClick={() => setTextModalOpen(true)}
      >
        Text
      </Button>
      <Modal
        open={textModalOpen}
        onClose={() => setTextModalOpen(false)}
      >
        <Box sx={modalStyle(isPhone)}>
          <Typography variant="h6">Enter your text</Typography>
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
            <Button onClick={handleTextSubmit} style={{ ...buttonStyle, margin: '0 20px 0 0' }}>
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
