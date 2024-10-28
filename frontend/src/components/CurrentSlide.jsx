import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useMediaQuery } from 'react-responsive';

function CurrentSlide({ slides, currentSlideIndex, nextSlide, prevSlide }) {
  const currentSlide = slides[currentSlideIndex];

  const isTinyPhone = useMediaQuery({ query: '(max-width: 430px)' });
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 601px) and (max-width: 1024px)' });

  const currentSlideStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isPhone ? '10px' : '20px',
    height: isTinyPhone ? '400px' : isPhone ? '380px' : isTablet ? '400px' : '500px',
    width: isTinyPhone ? '200px' : isPhone ? '300px' : isTablet ? '400px' : '800px',
    border: '1px dotted #000',
    backgroundColor: '#fff'
  };

  return (
    <div id="currentSlide" style={currentSlideStyle}>
      {currentSlide?.objects?.map((object, index) => {
        const key = object.id || index;
        let videoId = '';

        if (object.type === 'video') {
          try {
            videoId = new URLSearchParams(new URL(object.title).search).get('v');
          } catch (error) {
            console.error('Invalid URL');
          }
        }

        switch (object.type) {
          case 'text':
            return <p key={key} style={object.style}>{object.title}</p>;
          case 'image':
            return <img key={key} src={object.source} alt={object.alt} />;
          case 'video':
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
                customStyle={{ width: '80%', height: '50%' }}
              >
                {object.title}
              </SyntaxHighlighter>
            );
          default:
            return null;
        }
      })}
      <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '10px', fontSize: '1em', color: 'black' }}>
        {currentSlideIndex}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        {currentSlideIndex > 0 && (
          <button onClick={prevSlide} className="btn btn-outline">
            Previous
          </button>
        )}
        {currentSlideIndex < slides.length - 1 && (
          <button onClick={nextSlide} className="btn btn-outline">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default CurrentSlide;
