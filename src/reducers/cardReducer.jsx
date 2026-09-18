import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards: [],
    activeCardId: null
}

const cardSlice = createSlice ({
    name: "card",
    initialState,
    reducers: {
        addCard: (state, action) => {
            if(state.cards.length >= 4){
                return;
            }
            const newCard= {
                id: crypto.randomUUID(),
                ...action.payload,
        };
        state.cards.push(newCard);
        state.activeCardId = newCard.id;
        },
        setActiveCard: (state, action) => {
            state.activeCardId = action.payload;
        }
    },
});

export const { addCard, setActiveCard } = cardSlice.actions;
export default cardSlice.reducer;