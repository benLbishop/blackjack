import { Card, CardValue } from '../types/cardTypes';
import { Dealer, Player } from '../types/playerTypes';
import constants from '../config/constants';

const makeHand = (newCards: Card[], startingIdx: number, numCards: number): Card[] => {
    const hand: Card[] = [];
    let i = 0;
    let cardIdx = startingIdx;
    while (i < numCards) {
        hand.push(newCards[cardIdx]);
        i++;
        cardIdx++;
    }
    return hand;
}

const calculateHandScore = (hand: Card[]) => {
    interface ScoreAccumulator {
        score: number;
        numHighAces: number;
    }
    const { score: totalScore } = hand.reduce((accum: ScoreAccumulator, nextCard: Card): ScoreAccumulator => {
        let { score, numHighAces } = accum;
        if (nextCard.value === 11) {
            numHighAces += 1;
        }
        score += nextCard.value;
        if (score > 21 && numHighAces > 0) {
            // treat one of the aces we've seen as a low ace
            score -= 10;
            numHighAces -= 1;
        }
        return {
            score,
            numHighAces
        }
    }, {score: 0, numHighAces: 0});
    return totalScore;
}

export const updateHand = (player: Player, newCard: Card): Player => {
    const updatedCards = [...player.cards, newCard];
    const updatedScore = calculateHandScore(updatedCards);
    return {
        ...player,
        cards: updatedCards,
        score: updatedScore
    }
}

export const dealStartingCards = (newCards: Card[], dealer: Dealer, players: Player[]): { dealer: Dealer, players: Player[] } => {
    // NOTE: it's assumed newCards has enough cards to account for the given players and dealer.
    const refreshedPlayers = players.slice();

    let playerIdx = 0;
    let cardsIdx = 0;
    const handSize = constants.game.NUM_STARTING_CARDS;
    // create hand for each player
    while (playerIdx < players.length) {
        const startingCards = makeHand(newCards, cardsIdx, handSize);
        const startingScore = calculateHandScore(startingCards);

        refreshedPlayers[playerIdx] = {
            ...refreshedPlayers[playerIdx],
            cards: startingCards,
            score: startingScore
        }
        // update idxs
        cardsIdx += handSize;
        playerIdx++;
    }
    // lastly, create dealer hand
    const dealerCards = makeHand(newCards, cardsIdx, handSize);
    const dealerScore = calculateHandScore(dealerCards);
    const refreshedDealer: Dealer = {
        ...dealer,
        cards: dealerCards,
        score: dealerScore
    };

    return {
        dealer: refreshedDealer,
        players: refreshedPlayers
    }
}

// TODO: convert to enum
export const parseCardValue = (valStr: string): number => {
    if (valStr === '2') {
        return 2;
    }
    if (valStr === '3') {
        return 3;
    }
    if (valStr === '4') {
        return 4;
    }
    if (valStr === '5') {
        return 5;
    }
    if (valStr === '6') {
        return 6;
    }
    if (valStr === '7') {
        return 7;
    }
    if (valStr === '8') {
        return 8;
    }
    if (valStr === '9') {
        return 9;
    }
    if (valStr === 'ACE') {
        return 11;
    }
    return 10;
}

export const checkForPlayerCompletion = (player: Player): {
    isComplete: boolean;
    playerWon: boolean;
} => {
    let isComplete = false;
    let playerWon = false;
    if (player.score > 21) {
        isComplete = true;
    } else if (player.score === 21) {
        // TODO: this logic only works if the dealer can't hit.
        // needs to be updated to take dealer's score into account
        isComplete = true;
        playerWon = true;
    }
    return {
        isComplete,
        playerWon
    }
}