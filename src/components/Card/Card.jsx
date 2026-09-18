import "./Card.css";
import {
  vendorBitcoin,
  vendorBlockchain,
  vendorEvil,
  vendorNinja,
  chipLight,
  chipDark,
} from "../../assets/index";

const vendorImages = {
  bitcoin: vendorBitcoin,
  blockchain: vendorBlockchain,
  evil: vendorEvil,
  ninja: vendorNinja,
};

function Card({ card }) {
  const chipImage =
  !card.vendor || card.vendor === "bitcoin"
    ? chipDark
    : chipLight;

  const vendorImage = card.vendor ? vendorImages[card.vendor] : vendorBitcoin;

  const formattedCardNumber = card.cardNumber.replace(/(.{4})/g, "$1 ").trim();

  return (
    <div className={`card ${card.vendor}`}>
      <img
      src={chipImage}
      className="chip"
      alt="chip" />
      <img
        src={vendorImage}
        className="vendorIcon"
        alt={card.vendor || "vendor"}
      />
      <p className="cardNumber">{formattedCardNumber}</p>
      <div className="card-footer">
        <div className="cardholder">
          <p>CARDHOLDER NAME</p>
          <p>{card.cardholderName}</p>
        </div>
        <div className="valid-thru">
          <p>VALID THRU</p>
          <p>{card.validThru}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
