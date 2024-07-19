import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, desabled }) {

    const handleClick = () => {
        if (!desabled) {
            handleChoice(card);
        }   
    };
    
    return (
        <div className="card">
          <div className={flipped ? "flipped" : ""}>
            <img className="front" src={card.src} alt="card front" />
            <img
                onClick={handleClick}
                className="back"
                src="/img/cover.png"
                alt="cover"
            />
          </div>
        </div>
      );
}