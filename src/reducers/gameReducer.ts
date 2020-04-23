import { cardActions, CardAction } from '../actions/cardActions';
import { getType } from 'typesafe-actions';
import { DeckMetaData } from '../types/cardTypes';

export interface GameState {
    testString: string; // TODO: remove
    deck?: DeckMetaData;
}

const initialState: GameState = {
    testString: 'reducerTest'
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
        case getType(cardActions.deckInitialized): {
            return {
                ...state,
                deck: action.payload.deckData
            }
        }
        default: {
            return state;
        }
    }
};

export default GameReducer;