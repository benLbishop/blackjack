import axios, { AxiosResponse } from 'axios';
import { Card, DeckMetaData } from '../types/cardTypes';
import constants from '../config/constants';

const handleAPIError = (err: any) => {
    // TODO
    console.log('API Error: ', err);
};

interface GetDeckRes extends DeckMetaData {
    success: boolean,
}

export const getNewDeck = async (numDecks?: number): Promise<DeckMetaData | undefined> => {
    const deckCount = numDecks ? numDecks : constants.deckAPI.DEFAULT_DECK_COUNT;
    let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`;

    let res: AxiosResponse;

    try {
        res = await axios.get(url);
    } catch (err) {
        handleAPIError(err);
        return undefined;
    }
    const data = res.data as GetDeckRes;
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