import "./Home.css";
import Card from "../../components/Card/Card";
import Top from "../../components/Top/Top";
import CardStack from "../../components/CardStack/CardStack";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setActiveCard } from "../../reducers/cardReducer";
import { Link } from "react-router-dom";

function Home() {
  const cards = useSelector((state) => state.card.cards);
  const activeCardId = useSelector((state) => state.card.activeCardId);
  const dispatch = useDispatch();
  const [showMaxMessage, setShowMaxMessage] = useState(false);

  const activeCard = cards.find((card) => card.id === activeCardId);
  const inactiveCards = cards.filter((card) => card.id !== activeCardId);

  const handleMaxCards = () => {
    setShowMaxMessage(true);

    setTimeout(() => {
      setShowMaxMessage(false);
    }, 3000);
  };

  console.log(cards);

  return (
    <div className="home">
      <Top title="E-WALLET" />
      {activeCard ? (
        <>
          <p className="section-label">ACTIVE CARD</p>
          <Card card={activeCard} />
        </>
      ) : (
        <p className="no-active-card">NO ACTIVE CARDS</p>
      )}

      <CardStack
        cards={inactiveCards}
        onCardClick={(id) => dispatch(setActiveCard(id))}
      />

      {cards.length < 4 ? (
        <Link to="/addcard" className="add-card-link">
          <button className="add-card-btn">ADD A NEW CARD</button>
        </Link>
      ) : (
        <div className="add-card-container">
          <button className="add-card-btn" onClick={handleMaxCards}>
            ADD A NEW CARD
          </button>

          {showMaxMessage && (
            <p className="max-cards-popup">You can only have 4 cards.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
