// SidebarComponents.jsx
import React from 'react';
import TextComponent from './TextComponent';
import CodeComponent from './CodeComponent';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';
import { useMediaQuery } from 'react-responsive';

const SidebarComponents = ({
  useState,
  currentSlide,
  slides,
  setSlides,
  decks
}) => {
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const isTinyPhone = useMediaQuery({ query: '(max-width: 430px)' });
  const sidebarStyle = {
    width: isTinyPhone ? '20%' : isPhone ? '20%' : '15%',
    height: '100%',
    padding: isPhone ? '4px' : '20px 0',
    margin: isTinyPhone ? '2px 0' : isPhone ? '10px' : '0 70px 0px 0', // top, right, bottom, left
    borderRight: '1px solid #000',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <div id="sidebar" style={sidebarStyle}>
      <TextComponent
        useState={useState}
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
      />
      <CodeComponent
        useState={useState}
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
      />
      <VideoComponent
        useState={useState}
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
      />
      <ImageComponent
        useState={useState}
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
      />
    </div>
  );
};

export default SidebarComponents;
