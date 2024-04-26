import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useMediaQuery } from 'react-responsive';

function Presentation ({ slides }) {
  // State to manage current slide index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex];
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
  const isTablet = useMediaQuery({
    query: '(min-width: 601px) and (max-width: 1024px)'
  });
  const isLaptop = useMediaQuery({ query: '(min-width: 1025px)' });

  const currentSlideStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isPhone ? '10px' : '20px',
    height: isTinyPhone
      ? '400px'
      : isPhone
        ? '380px'
        : isTablet
          ? '400px'
          : isLaptop
            ? '500px'
            : '500px',
    width: isTinyPhone
      ? '200px'
      : isPhone
        ? '300px'
        : isTablet
          ? '400px'
          : isLaptop
            ? '800px'
            : '800px',
    border: '1px dotted #000',
    backgroundColor: '#fff'
  };

  return (
    <>
      <div id="currentSlide" style={currentSlideStyle}>
        {currentSlide &&
          currentSlide.objects &&
          currentSlide.objects.map((object, index) => {
            const key = object.id || index;
            let videoId = '';
            switch (object.type) {
              case 'text':
                return (
                  <p key={key} style={object.style}>
                    {object.title}
                  </p>
                );
              case 'image':
                return <img key={key} src={object.source} alt={object.alt} />;
              case 'video':
                try {
                  videoId = new URLSearchParams(
                    new URL(object.title).search
                  ).get('v');
                } catch (error) {
                  console.error('Invalid URL');
                }
                return (
                  <iframe
                    key={key}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Slide content"
                  />
                );
              case 'code':
                return (
                  <SyntaxHighlighter
                    language={object.language}
                    style={solarizedlight}
                    key={key}
                    customStyle={{
                      width: '80%',
                      height: '50%'
                    }}
                  >
                    {object.title}
                  </SyntaxHighlighter>
                );
              default:
                return null;
            }
          })}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            padding: '10px',
            fontSize: '1em',
            color: 'black',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {currentSlideIndex}
        </div>
      </div>
    </>
  );
}

export default Presentation;
