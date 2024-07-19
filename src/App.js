import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
];


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [desabled, setDesabled] = useState(false);


  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };

  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setDesabled(false);

    if (choiceOne || choiceTwo) {
      setTurns((prev) => prev + 1 );
    }
  };

  // compare 2 selected cards 
  useEffect(() => {
    if (choiceOne && choiceTwo) { 
      setDesabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (choiceOne.src === card.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });

        resetTurn();
      }
    }
    let timeId = setTimeout(() => {
      resetTurn();
    }, 1000);

    // cleanup function
    return () => { 
      clearTimeout(timeId)
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);


  return (
    <div className="App">
      <h1>Магическая битва</h1>
      <button onClick={shuffleCards}>Новая игра</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            desabled={desabled}
            
          />
        ))}
        <p>Количество ходов: {turns}</p>
      </div>
    </div>
  );
}

export default App;
