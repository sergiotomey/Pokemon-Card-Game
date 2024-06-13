import imageBack from "./assets/pokemon-card-back.png";
import charizard from "./assets/006.png";
import venusaur from "./assets/003.png";
import blastoise from "./assets/009.png";
import pikachu from "./assets/025.png";
import gengar from "./assets/094.png";
import mewtwo from "./assets/150.png";
import { useState, useEffect } from "react";

function Cards() {
  const [arrayCards, setArrayCards] = useState([
    { index: 0, name: "Charizard", img: charizard, isClicked: false },
    { index: 1, name: "Venusaur", img: venusaur, isClicked: false },
    { index: 2, name: "Blastoise", img: blastoise, isClicked: false },
    { index: 3, name: "Pikachu", img: pikachu, isClicked: false },
    { index: 4, name: "Gengar", img: gengar, isClicked: false },
    { index: 5, name: "Mewtwo", img: mewtwo, isClicked: false },
    { index: 6, name: "Charizard", img: charizard, isClicked: false },
    { index: 7, name: "Venusaur", img: venusaur, isClicked: false },
    { index: 8, name: "Blastoise", img: blastoise, isClicked: false },
    { index: 9, name: "Pikachu", img: pikachu, isClicked: false },
    { index: 10, name: "Gengar", img: gengar, isClicked: false },
    { index: 11, name: "Mewtwo", img: mewtwo, isClicked: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function shuffleCards(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    setArrayCards(shuffleCards(arrayCards));
  }, []);

  const [flippedCards, setFlippedCards] = useState([]);
  let [turn, setTurn] = useState(0);
  const failSound = new Audio("src/assets/emerald_0020.wav");
  const succeedSound = new Audio(
    "src/assets/pokemon-red_blue_yellow-item-found-sound-effect.mp3"
  );
  succeedSound.volume = 0.4;
  const victorySound = new Audio(
    "src/assets/pokemon-red_blue_yellow-level-up-sound-effect.mp3"
  );
  victorySound.volume = 0.6;

  function cardClicked(index) {
    if (arrayCards[index].isClicked || flippedCards.length === 2) {
      return;
    }
    let updatedCards = arrayCards.map((card, i) =>
      i === index ? { ...card, isClicked: true } : card
    );
    setArrayCards(updatedCards);
    setFlippedCards([...flippedCards, updatedCards[index]]);
    if (flippedCards.length === 1) {
      setTurn((prevTurn) => prevTurn + 1);
    }
    if (updatedCards.every((card) => card.isClicked)) {
      setTimeout(() => {
        victorySound.play();
        setModalOpen(true);
      }, 500);
    }
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.name !== secondCard.name) {
        setTimeout(() => {
          failSound.play();
          setArrayCards((prevCards) =>
            prevCards.map((card) =>
              card.index === firstCard.index || card.index === secondCard.index
                ? { ...card, isClicked: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      } else {
        succeedSound.play();
        setFlippedCards([]);
      }
    }
  }, [flippedCards]);

  return (
    <div>
      <ul className="container">
        {arrayCards.map((card, index) => (
          <li onClick={() => cardClicked(index)} key={index}>
            <img src={card.isClicked ? card.img : imageBack} alt={card.name} />
          </li>
        ))}
      </ul>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="turns-div">
              <img src="src/assets/pngwing.com.png" alt="" />
              <h1>You Win!</h1>
              <img src="src/assets/pngwing.com.png" alt="" />
            </div>
            <p>{`You won in ${turn} turns!`}</p>
            <button
              onClick={() => {
                location.reload();
              }}
            >
              Play Again!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cards;
