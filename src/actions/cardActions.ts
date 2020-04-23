import { createAction, ActionType } from 'typesafe-actions'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Card, DeckMetaData } from '../types/cardTypes';
import RootState from '../reducers';
import { getNewDeck } from '../lib/deck';

export const cardActions = {
    cardAdded: createAction(
        'CARD_ADDED',
        (playerId: string, card: Card) => ({ playerId, card })
    )(),
    deckInitialized: createAction(
        'DECK_INITIALIZED',
        (deckData: DeckMetaData) => ({ deckData })
    )()
}

export type CardAction = ActionType<typeof cardActions>;

export const initializeDeck = (deckCount?: number) => {
    return async (dispatch: ThunkDispatch<RootState, void, Action>) => {
        const deckData = await getNewDeck(deckCount);
        if (!deckData) {
            // TODO
            console.log('getNewDeck returned undefined');
            return;
        }
        dispatch(cardActions.deckInitialized(deckData));
    };
};