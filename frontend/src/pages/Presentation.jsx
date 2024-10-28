import React, { useState, useEffect, useCallback } from 'react';
import { Button, createSvgIcon } from '@mui/material';
import Header from '../components/TitleHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';
import CurrentSlide from '../components/CurrentSlide.jsx';
import { useLocation } from 'react-router-dom';

// SVG Component for Plus Icon
const PlusIcon = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus'
);

// Default slide data
const defaultSlides = [
  {
    id: 1,
    page: 1,
    objects: [{ id: Date.now(), type: 'text', title: '' }] // Make sure each object has a unique ID
  }
];

function Presentation ({ token, decks, setDecks }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deckId = queryParams.get('deckid');
  const deckName = queryParams.get('deckname');
  
  const [slides, setSlides] = useState(
    JSON.parse(localStorage.getItem('deck') || '{}').slides || defaultSlides
  );
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Store slides in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('deck', JSON.stringify({ deckId, deckName, slides }));
    } catch (error) {
      console.error('Error storing slides:', error);
    }
  }, [slides, deckId, deckName]);

  // Handle adding a new slide
  const handleAddSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      page: slides.length + 1,
      objects: [{ id: Date.now(), type: 'text', title: `Slide ${slides.length + 1}` }]
    };
    setSlides((prevSlides) => [...prevSlides, newSlide]);
  };

  // Handle deleting a slide
  const handleDeleteSlide = () => {
    setSlides((prevSlides) => {
      const updatedSlides = prevSlides.filter((_, index) => index !== currentSlideIndex);
      // Adjust currentSlideIndex if the deleted slide is the current one
      setCurrentSlideIndex(prevIndex => (prevIndex >= updatedSlides.length ? updatedSlides.length - 1 : prevIndex));
      return updatedSlides;
    });
  };

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) setCurrentSlideIndex(currentSlideIndex + 1);
  }, [currentSlideIndex, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  }, [currentSlideIndex]);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') prevSlide();
      else if (event.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Get the current slide based on the index
  const currentSlide = slides[currentSlideIndex] || defaultSlides[0]; // Fallback to a default slide if currentSlide is undefined

  return (
    <div className="min-h-screen bg-gray-100">
      <Header decks={decks} setDecks={setDecks} deckId={deckId} deckName={deckName} />

      <div className="flex flex-col lg:flex-row mx-4 my-8 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div className="lg:w-1/4 p-4 bg-gray-200">
          <Sidebar
            currentSlide={currentSlide} // Pass the current slide object
            slides={slides}
            setSlides={setSlides}
            decks={decks}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 p-6 flex flex-col space-y-6">
          {/* Buttons for Adding and Deleting Slides */}
          <div className="flex justify-end space-x-2">
            <Button variant="contained" color="primary" onClick={handleAddSlide} startIcon={<PlusIcon />}>
              Add Slide
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDeleteSlide}>
              Delete Slide
            </Button>
          </div>

          {/* Current Slide */}
          <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden p-4">
            <CurrentSlide 
              slides={slides} 
              currentSlideIndex={currentSlideIndex} 
              nextSlide={nextSlide} 
              prevSlide={prevSlide} 
              currentSlide={currentSlide} // Pass the current slide object to CurrentSlide
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
