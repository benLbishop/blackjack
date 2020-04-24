import { gameActions, GameAction } from '../actions/cardActions';
import { getType } from 'typesafe-actions';
import { DeckMetaData, Card } from '../types/cardTypes';
import { Dealer, Player } from '../types/playerTypes';
import constants from '../config/constants';
import { updateHand, checkForPlayerCompletion } from '../lib/blackjack';

export interface GameState {
    deck?: DeckMetaData;
    dealer: Dealer;
    players: Player[];
    isComplete: boolean;
    playerWon: boolean;
}

const initialState: GameState = {
    dealer: constants.game.DEFAULT_DEALER,
    players: [constants.game.DEFAULT_PLAYER],
    isComplete: false,
    playerWon: false
};

const GameReducer = (
    state: GameState = initialState,
    action: GameAction
): GameState => {
    switch (action.type) {
        case getType(gameActions.deckInitialized): {
            return {
                ...state,
                deck: action.payload.deckData
            }
        }
        case getType(gameActions.gameInitialized): {
            const { dealer, players } = action.payload;
            let isComplete = false;
            let playerWon = false;
            // check to see if dealer won
            if (dealer.score === 21) {
                isComplete = true;
            } else if (players[0].score === 21) {
                // TODO: don't make this depend on one player
                isComplete = true;
                playerWon = true;
            }
            return {
                ...state,
                dealer,
                players,
                isComplete,
                playerWon
            };
        }
        case getType(gameActions.addCardToHand): {
            const { playerId, newCard } = action.payload;

            // get the index in the player array based on payload
            const updatedPlayers = state.players.slice();
            const playerIdx = updatedPlayers.findIndex(p => {
                return p.id === playerId;
            })
            if (playerIdx < 0) {
                // TODO: error of some sort
                return state;
            }

            const updatedPlayer = updateHand(updatedPlayers[playerIdx], newCard);
            // check to see if player has busted or has 21
            const { isComplete, playerWon } = checkForPlayerCompletion(updatedPlayer);
            updatedPlayers[playerIdx] = updatedPlayer;

            return {
                ...state,
                isComplete,
                playerWon,
                players: updatedPlayers
            };
        }
        case getType(gameActions.playerFinished): {
            const playerId = action.payload.playerId;
            const player = state.players.find(p => p.id === playerId);
            if (!player) {
                // TODO: error of some sort
                return state;
            }

            // we've checked for busting when adding cards, so just need to check if we beat dealer's score
            let playerWon = false;
            if (player.score > state.dealer.score) {
                playerWon = true;
            }
            return {
                ...state,
                playerWon,
                isComplete: true
            }
        }
        default: {
            return state;
        }
    }
};

export default GameReducer;