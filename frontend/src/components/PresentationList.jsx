import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const presentationList = {
  width: 'calc(100% - 40px)',
  height: 'calc(100% - 20px)',
  margin: '70px 50px 10px 20px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start'
};

export function PresentationList ({ decks, setDecks }) {
  console.log('in the belly of the beast', decks);
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const cardStyle = {
    width: isPhone ? '150px' : '300px',
    height: '150px',
    margin: '20px 10px 0 0'
  };
  return (
    <div className="presentation-list" style={presentationList}>
      {decks.map((deck, index) => (
        <Link
          to={{
            pathname: '/presentation/edit',
            search: `?deckId=${deck.deckId}`,
            state: { decks, setDecks }
          }}
          key={index}
        >
          <Card key={index} sx={cardStyle}>
            <CardContent>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundSize: 'cover',
                  backgroundColor: 'grey'
                  // backgroundImage: `url(${thumbnailUrl})`
                }}
              />
              <Typography variant="h6">Deck Name: {deck.deckName}</Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                Description: {deck.description}
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                Number of slides: {deck.slides.length}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default PresentationList;
