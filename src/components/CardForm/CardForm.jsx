import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { addCard } from "../../reducers/cardReducer";
import "./CardForm.css";

function CardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = useSelector((state) => state.card.cards);

  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [validThru, setValidThru] = useState("");
  const [cvv, setCcv] = useState("");
  const [vendor, setVendor] = useState("");

  const previewCard = {
    cardNumber: cardNumber || "XXXXXXXXXXXXXXXX",
    cardholderName: cardholderName || "FIRSTNAME LASTNAME",
    validThru: validThru || "MM/YY",
    vendor,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCard = {
      cardNumber,
      cardholderName,
      validThru,
      vendor,
    };

    dispatch(addCard(newCard));
    navigate("/");
  };

  return (
    <div className="card-form-page">
      <p className="section-label">NEW CARD</p>

      <Card card={previewCard} />

      <form className="card-form" onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">CardNumber</label>
        <input
          id="cardNumber"
          value={cardNumber}
          placeholder="1234 5678 9012 3456"
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*$/.test(value)) {
              setCardNumber(value);
            }
          }}
          minLength={16}
          maxLength={16}
          required
        />

        <label htmlFor="cardholderName">Cardholder name</label>
        <input
          id="cardholderName"
          value={cardholderName}
          placeholder="FIRSTNAME LASTNAME"
          onChange={(e) => {
            const value = e.target.value;

            if (!/\d/.test(value)) {
              setCardholderName(value);
            }
          }}
          minLength={2}
          maxLength={30}
          required
        />

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="validThru">Valid thru</label>
            <input
              id="validThru"
              value={validThru}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                
                if (value.length > 4) {
                  value = value.slice(0, 4);
                }
                
                if (value.length > 2) {
                  value = value.slice(0, 2) + "/" + value.slice(2);
                }
                
                setValidThru(value);
              }}
              placeholder="MM/YY"
              pattern="(0[1-9]|1[0-2])/[0-9]{2}"
              title="Enter a valid month between 01 and 12"
              minLength={5}
              maxLength={5}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              value={cvv}
              placeholder="123"
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  setCcv(value);
                }
              }}
              minLength={3}
              maxLength={3}
              required
            />
          </div>
        </div>

        <label htmlFor="vendor">Vendor</label>
        <select
          id="vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          required
        >
          <option value="">-- Select a vendor --</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="blockchain">Blockchain</option>
          <option value="evil">Evil</option>
          <option value="ninja">Ninja</option>
        </select>

        <button
          className="add-card-btn"
          type="submit"
          disabled={cards.length >= 4}
        >
          ADD CARD
        </button>
      </form>
    </div>
  );
}

export default CardForm;
