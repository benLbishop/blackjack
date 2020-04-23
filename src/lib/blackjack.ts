import { Card, CardValue } from '../types/cardTypes';
import { Dealer, Player } from '../types/playerTypes';

export const calculateHandScore = (hand: Card[]) => {
    interface ScoreAccumulator {
        score: number;
        numHighAces: number;
    }
    const { score: totalScore, numHighAces } = hand.reduce((accum: ScoreAccumulator, nextCard: Card): ScoreAccumulator => {
        let { score, numHighAces } = accum;
        if (nextCard.value === 11) {
            numHighAces += 1;
        }
        // TODO: idk why this enum value is being a string instead of an int
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

export const playerHasBusted = (score: number) => {
    return score > 21;
};

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