// Game.js
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const Card = ({ card, index, moveCard }) => {
  const [, drag] = useDrag({
    type: 'CARD',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index; // Update the dragged item's index
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="card"
      style={{
        padding: '10px',
        margin: '5px',
        border: '1px solid #000',
        cursor: 'move',
        backgroundColor: 'lightblue',
        borderRadius: '5px',
        width: '60px',
        textAlign: 'center',
      }}
    >
      {card}
    </div>
  );
};

const Game = () => {
  const [cards, setCards] = useState([
    '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠', 'A♠',
    '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣', 'A♣',
  ]);

  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  return (
    <div>
      <h2>Rummy Card Shuffle</h2>
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '500px',
            margin: '0 auto',
          }}
        >
          {cards.map((card, index) => (
            <Card key={index} index={index} card={card} moveCard={moveCard} />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default Game;
