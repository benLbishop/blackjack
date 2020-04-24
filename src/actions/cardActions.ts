import { createAction, ActionType } from 'typesafe-actions'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Card, DeckMetaData } from '../types/cardTypes';
import RootState from '../reducers';
import { getNewDeck, drawOneCard, drawBlackjackStartingCards } from '../lib/deckAPI';
import { Player, Dealer } from '../types/playerTypes';
import { dealStartingCards } from '../lib/blackjack';

export const gameActions = {
    deckInitialized: createAction(
        'DECK_INITIALIZED',
        (deckData: DeckMetaData) => ({ deckData })
    )(),
    gameInitialized: createAction(
        'GAME_INITIALIZED',
        (dealer: Dealer, players: Player[]) => ({ dealer, players })
    )(),
    addCardToHand: createAction(
        'ADD_CARD_TO_HAND',
        (playerId: string, newCard: Card) => ({ playerId, newCard })
    )(),
    playerFinished: createAction(
        'PLAYER_FINISHED',
        (playerId: string) => ({ playerId })
    )()
}

export type GameAction = ActionType<typeof gameActions>;

export const initializeDeck = (deckCount?: number) => {
    return async (dispatch: ThunkDispatch<RootState, void, Action>) => {
        const deckData = await getNewDeck(deckCount);
        if (!deckData) {
            // TODO
            console.log('getNewDeck returned undefined');
            return;
        }
        dispatch(gameActions.deckInitialized(deckData));
        dispatch(initializeNewGame())
    };
};

export const initializeNewGame = () => {
    return async (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const { deck, players, dealer } = getState().game;
        const deckId = deck?.deck_id;
        const numPlayers = players.length; 
        if (!deckId) {
            // TODO
            console.log('no deckId when initializing game');
            return;
        }
        const cards = await drawBlackjackStartingCards(deckId, numPlayers);
        const { dealer: updatedDealer, players: updatedPlayers } = dealStartingCards(cards, dealer, players);
        dispatch(gameActions.gameInitialized(updatedDealer, updatedPlayers));
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
        dispatch(gameActions.addCardToHand(playerId, newCard));
    };
};

export const handleStand = (playerId: string) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>) => {
        dispatch(gameActions.playerFinished(playerId));
    };
};