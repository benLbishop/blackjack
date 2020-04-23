import { Card, CardValue } from '../types/cardTypes';

export const calculateHandScore = (hand: Card[]) => {
    interface ScoreAccumulator {
        score: number;
        numHighAces: number;
    }
    const { score: totalScore, numHighAces } = hand.reduce((accum: ScoreAccumulator, nextCard: Card): ScoreAccumulator => {
        let { score, numHighAces } = accum;
        if (nextCard.value === CardValue.ACE) {
            numHighAces += 1;
        }
        // TODO: idk why this enum value is being a string instead of an int
        console.log('before score', score)
        score += getCardValueInt(nextCard.value);
        console.log('after score', score)
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

const calculateGameResult = () => {

}

const getCardValueInt = (valStr: CardValue): number => {
    //@ts-ignore
    const val = parseInt(valStr, 10);
    console.log('cardVal: ', val, valStr);
    if (val === 0) {
        return 2;
    }
    if (val === 1) {
        return 3;
    }
    if (val === 2) {
        return 4;
    }
    if (val === 3) {
        return 5;
    }
    if (val === 4) {
        return 6;
    }
    if (val === 5) {
        return 7;
    }
    if (val === 6) {
        return 8;
    }
    if (val === 7) {
        return 9;
    }
    if (val === 11) {
        return 11;
    }
    console.log('did not find')
    return 10;
}