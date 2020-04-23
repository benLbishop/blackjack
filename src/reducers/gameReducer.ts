import { cardActions, CardAction } from '../actions/cardActions';
import { getType } from 'typesafe-actions';
import { DeckMetaData, Card } from '../types/cardTypes';
import { Dealer, Player } from '../types/playerTypes';
import constants from '../config/constants';
import { calculateHandScore } from '../lib/blackjack';

export interface GameState {
    testString: string; // TODO: remove
    deck?: DeckMetaData;
    dealer: Dealer;
    players: Player[];
    isComplete: boolean;
    playerWon: boolean;
}

const initialState: GameState = {
    testString: 'reducerTest',
    dealer: constants.game.DEFAULT_DEALER,
    players: [constants.game.DEFAULT_PLAYER],
    isComplete: false,
    playerWon: false
};

const GameReducer = (
    state: GameState = initialState,
    action: CardAction
): GameState => {
    switch (action.type) {
        case getType(cardActions.cardAdded): {
            const { playerId, newCard } = action.payload;
            const updatedPlayers = state.players.slice();
            const playerIdx = updatedPlayers.findIndex(p => {
                return p.id === playerId;
            })
            if (playerIdx < 0) {
                // TODO: error of some sort
                return state;
            }
            const updatedCards = [...updatedPlayers[playerIdx].cards, newCard];
            const updatedScore = calculateHandScore(updatedCards);
            updatedPlayers[playerIdx] = {
                ...updatedPlayers[playerIdx],
                cards: updatedCards,
                score: updatedScore
            }
            return {
                ...state,
                players: updatedPlayers
            };
        }
        case getType(cardActions.deckInitialized): {
            return {
                ...state,
                deck: action.payload.deckData
            }
        }
        case getType(cardActions.gameInitialized): {
            const { newCards } = action.payload;
            const refreshedPlayers = state.players;
            let refreshedDealer = {...state.dealer};
            // newCards should account for two cards per player and for the dealer
            let cardsIdx = 0;
            for (let i = 0; i < refreshedPlayers.length + 1; i++) {
                // TODO: probably should do this in order like how a normal game would work
                const startingCards = [newCards[cardsIdx], newCards[cardsIdx + 1]];
                const startingScore = calculateHandScore(startingCards);
                if (i === refreshedPlayers.length) {
                    // allocate cards for the dealer last
                    refreshedDealer.cards = startingCards as [Card, Card];
                    refreshedDealer.score = startingScore;
                } else {
                    refreshedPlayers[i] = {
                        ...refreshedPlayers[i],
                        cards: startingCards,
                        score: startingScore
                    }
                }
                cardsIdx += 2;
            }
            // TODO: see if dealer won on deal
            return {
                ...state,
                dealer: refreshedDealer,
                players: refreshedPlayers
            }
        }
        default: {
            return state;
        }
    }
};

export default GameReducer;