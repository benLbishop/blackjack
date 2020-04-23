import { createAction, ActionType } from 'typesafe-actions'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Card, DeckMetaData } from '../types/cardTypes';
import RootState from '../reducers';
import { getNewDeck, drawOneCard, initializeBlackjackGame } from '../lib/deckAPI';

export const cardActions = {
    cardAdded: createAction(
        'CARD_ADDED',
        (playerId: string, newCard: Card) => ({ playerId, newCard })
    )(),
    deckInitialized: createAction(
        'DECK_INITIALIZED',
        (deckData: DeckMetaData) => ({ deckData })
    )(),
    gameInitialized: createAction(
        'GAME_INITIALIZED',
        (newCards: Card[]) => ({ newCards })
    )(),
    playerFinished: createAction(
        'PLAYER_FINISHED',
        (playerId: string) => ({ playerId })
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
        dispatch(initializeNewGame())
    };
};

export const initializeNewGame = () => {
    return async (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const { deck, players } = getState().game;
        const deckId = deck?.deck_id;
        const numPlayers = players.length; 
        if (!deckId) {
            // TODO
            console.log('no deckId when initializing game');
            return;
        }
        const cards = await initializeBlackjackGame(deckId, numPlayers);
        dispatch(cardActions.gameInitialized(cards));
    };
};

export const handleHit = (playerId: string) => {
    return async (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const deckId = getState().game.deck?.deck_id;
        if (!deckId) {
            // TODO
            console.log('no deckId when trying to handle hit');
            return;
        }
        const newCard = await drawOneCard(deckId);
        dispatch(cardActions.cardAdded(playerId, newCard));
    };
};

export const handleStand = (playerId: string) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>) => {
        dispatch(cardActions.playerFinished(playerId));
    };
};