import Card from "../Card/Card";
import "./CardStack.css";

function CardStack({ cards, onCardClick }) {
  return (
    <div className="card-stack">
      {cards.map((card) => (
        <div key={card.id} onClick={() => onCardClick(card.id)}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}

export default CardStack;
