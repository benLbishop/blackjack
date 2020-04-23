import { cardActions, CardAction } from '../actions/cardActions';
import { getType } from 'typesafe-actions';
import { DeckMetaData } from '../types/cardTypes';
import { Dealer, Player } from '../types/playerTypes';
import constants from '../config/constants';

export interface GameState {
    testString: string; // TODO: remove
    deck?: DeckMetaData;
    dealer: Dealer;
    players: Player[];
}

const initialState: GameState = {
    testString: 'reducerTest',
    dealer: constants.game.DEFAULT_DEALER,
    players: [constants.game.DEFAULT_PLAYER]
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