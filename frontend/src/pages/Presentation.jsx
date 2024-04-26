import React, { useState, useEffect } from 'react';
import { Button, createSvgIcon } from '@mui/material';
import Header from '../components/TitleHeader.jsx';
import SidebarComponents from '../components/SidebarComponent.jsx';
import CurrentSlide from '../components/CurrentSlide.jsx';
import { useMediaQuery } from 'react-responsive';

// SVG Components
const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  'Plus'
);

// Default slide data
const defaultSlides = [
  {
    id: 1,
    page: 1,
    objects: [
      {
        type: 'text',
        title: ''
      }
    ]
  }
];

function Presentation ({ token, decks, setDecks }) {
  const queryParams = new URLSearchParams(location.search);
  const deckId = queryParams.get('deckid');
  const deckName = queryParams.get('deckname');
  const [slides, setSlides] = useState(
    localStorage.getItem('deck')
      ? JSON.parse(localStorage.getItem('deck')).slides || defaultSlides
      : defaultSlides
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex];
  useEffect(() => {
    try {
      localStorage.setItem(
        'deck',
        JSON.stringify({ deckId, deckName, slides })
      );
    } catch (error) {
      console.error('Error storing slides:', error);
    }
    setSlides(slides);
    setDecks((prevDecks) => {
      // Find the index of the deck to update
      const deckIndex = prevDecks.findIndex((deck) => deck.deckId === deckId);

      // If the deck is found, update it
      if (deckIndex !== -1) {
        prevDecks[deckIndex] = { deckId, deckName, slides };
      } else {
        // If the deck is not found, add it
        prevDecks.push({ deckId, deckName, slides });
      }

      return [...prevDecks];
    });
  }, [slides, token]);

  // Updating handleAddSlide
  const handleAddSlide = () => {
    const newSlide = {
      id: slides.length + 1, // or generate a unique ID
      page: slides.length + 1,
      objects: [
        {
          id: Date.now(),
          type: 'text',
          title: 'Slide ' + (slides.length + 1) // initial title
        }
      ]
    };
    console.log('New Slide:', newSlide);

    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides, newSlide];
      console.log('Updated slides:', updatedSlides); // Log updated slides inside setSlides
      return updatedSlides;
    });
  };

  // Function to handle deleting a slide
  const handleDeleteSlide = () => {
    setSlides((prevSlides) => {
      return prevSlides.filter((slide, index) => index !== currentSlideIndex);
    });

    // If the current slide is the last one, move to the previous slide
    if (currentSlideIndex === slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  // Function to handle moving to next slide
  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  // Function to handle moving to previous slide
  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevSlide, nextSlide]);
  const isTinyPhone = useMediaQuery({ query: '(max-width: 430px)' });
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  // const isTablet = useMediaQuery({
  //   query: '(min-width: 601px) and (max-width: 1024px)'
  // });
  // const isLaptop = useMediaQuery({ query: '(min-width: 1025px)' });

  // Styles
  const containerStyle = {
    height: isPhone ? '100%' : '80%',
    margin: '10px 0',
    padding: isPhone ? '0' : '10px 5px 20px 5px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    border: '1px solid #ccc',
    backgroundColor: '#f8f9fa',
    overflow: 'hidden'
  };

  const SlideLayout = {
    width: isPhone ? '30%' : '80%',
    height: '100%',
    display: 'flex',
    flexDirection: isTinyPhone ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: isPhone ? '0' : '0 20px 0 0' // top, right, bottom, left
  };
  const buttonBar = {
    display: 'flex',
    flexDirection: isPhone ? 'column' : 'row',
    justifyContent: 'flex-end',
    margin: '5px 0 0 0'
  };
  return (
    <div className="container">
      <Header
        useState={useState}
        decks={decks}
        setDecks={setDecks}
        deckId={deckId}
        deckName={deckName}
      />
      <div id="presentation-container" style={containerStyle}>
        {/* Sidebar */}
        <SidebarComponents
          useState={useState}
          currentSlide={currentSlide}
          slides={slides}
          setSlides={setSlides}
          decks={decks}
        />
        <div id="nav" style={{ SlideLayout }}>
          <div style={buttonBar}>
            <Button variant="outlined" size="small" onClick={handleAddSlide}>
              <PlusIcon />
            </Button>

            <Button variant="outlined" onClick={handleDeleteSlide}>
              Delete Slidelide
            </Button>
          </div>

          <CurrentSlide slides={slides} />

          {/* Navigation buttons to move between slides */}
          <div style={buttonBar}>
            {currentSlideIndex !== 0 && (
              <Button variant="outlined" size="small" onClick={prevSlide}>
                Previous
              </Button>
            )}
            {currentSlideIndex !== slides.length - 1 && (
              <Button variant="outlined" size="small" onClick={nextSlide}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
