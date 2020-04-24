import axios, { AxiosResponse } from 'axios';
import { Card, DeckMetaData } from '../types/cardTypes';
import { parseCardValue } from './blackjack';
import constants from '../config/constants';

const handleAPIError = (err: any) => {
    // TODO
    console.log('API Error: ', err);
};

interface DeckRes extends DeckMetaData {
    success: boolean,
}

export const getNewDeck = async (numDecks?: number): Promise<DeckMetaData | undefined> => {
    const deckCount = numDecks ? numDecks : constants.deckAPI.DEFAULT_DECK_COUNT;
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`;

    let res: AxiosResponse;

    try {
        res = await axios.get(url);
    } catch (err) {
        handleAPIError(err);
        return undefined;
    }
    const data = res.data as DeckRes;
    if (data.success !== true) {
        // TODO
        handleAPIError(data);
        return undefined;
    }
    return {
        deck_id: data.deck_id,
        shuffled: data.shuffled,
        remaining: data.remaining
    }
};

const shuffleDeck = async (deckId: string) => {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;

    let res: AxiosResponse;

    try {
        res = await axios.get(url);
    } catch (err) {
        handleAPIError(err);
        throw err;
    }
    const data = res.data as DeckRes;
    if (data.success !== true) {
        // TODO
        handleAPIError(data);
        throw Error(`card retrieval not successful. Data: ${data.toString()}`);
    }
}

export const drawBlackjackStartingCards = async (deckId: string, numPlayers: number) => {
    // shuffle cards before game starts
    // TODO: Maybe shuffle only when remaining card count is low?
    await shuffleDeck(deckId);
    // generate 2 cards per player and 2 for dealer
    const numCards = 2 * (numPlayers + 1);
    return await getCards(deckId, numCards);
}

export const drawOneCard = async (deckId: string): Promise<Card> => {
    const res = await getCards(deckId, 1);
    return res[0];
}

interface GetCardsRes {
    success: boolean,
    deck_id: string,
    remaining: number,
    cards: Card[]
}

const getCards = async (deckId: string, numCards: number): Promise<Card[]> => {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`;

    let res: AxiosResponse;

    try {
        res = await axios.get(url);
    } catch (err) {
        handleAPIError(err);
        throw err;
    }
    const data = res.data as GetCardsRes;
    if (data.success !== true) {
        // TODO
        handleAPIError(data);
        throw Error(`card retrieval not successful. Data: ${data.toString()}`);
    }
    //@ts-ignore
    return data.cards.map(c => ({...c, value: parseCardValue(c.value)}));
}