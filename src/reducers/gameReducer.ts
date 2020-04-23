import { cardActions, CardAction } from '../actions/cardActions';
import { getType } from 'typesafe-actions';

export interface GameState {
    deckId: string;
}

const initialState: GameState = {
    deckId: 'reducerTest'
};

const GameReducer = (
    state: GameState = initialState,
    action: CardAction
): GameState => {
    switch (action.type) {
        case getType(cardActions.cardAdded): {
            // TODO
            console.log('cardAdded not implemented');
            return state;
        }
        default: {
            return state;
        }
    }
};

export default GameReducer;