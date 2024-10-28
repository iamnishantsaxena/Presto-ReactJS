import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import TextComponent from './TextComponent';
import CodeComponent from './CodeComponent';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';
import CSSPanel from './CSSPanel';
import { sidebarStyle } from '../css/sidebar.js';
import  '../css/sidebar.css';

const Sidebar = ({
  currentSlide,
  slides,
  setSlides,
  decks
}) => {
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const isTinyPhone = useMediaQuery({ query: '(max-width: 430px)' });

  // State for selected object and visibility of CSS panel
  const [selectedObject, setSelectedObject] = useState(null);
  const [isCSSPanelVisible, setCSSPanelVisible] = useState(false);

  // Function to handle selecting an object
  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    setCSSPanelVisible(true); // Show the CSS panel when an object is selected
  };

  // Update CSS function
  const updateCSS = (property, value) => {
    if (selectedObject) {
      const updatedSlide = {
        ...currentSlide,
        objects: currentSlide.objects.map(obj =>
          obj.id === selectedObject.id ? { ...obj, [property]: value } : obj
        ),
      };
      setSlides(slides.map(slide => (slide.id === currentSlide.id ? updatedSlide : slide)));
    }
  };

  return (
    <div id="sidebar" className="sidebar">
      <TextComponent
        className="sidebar-component"
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
        onObjectSelect={handleObjectSelect} // Pass the select handler
      />
      <CodeComponent
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
        onObjectSelect={handleObjectSelect} // Pass the select handler
      />
      <VideoComponent
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
        onObjectSelect={handleObjectSelect} // Pass the select handler
      />
      <ImageComponent
        currentSlide={currentSlide}
        slides={slides}
        setSlides={setSlides}
        decks={decks}
        onObjectSelect={handleObjectSelect} // Pass the select handler
      />
      
      {/* Add CSS Panel */}
      <CSSPanel 
        selectedObject={selectedObject} 
        onUpdateCSS={updateCSS} 
        isVisible={isCSSPanelVisible} 
      />
    </div>
  );
};

export default Sidebar;
