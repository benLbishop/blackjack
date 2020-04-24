import { Player, Dealer } from '../types/playerTypes';

const DEFAULT_PLAYER: Player = {
    id: 'player',
    displayName: 'default',
    cards: [],
    score: 0
};

const DEFAULT_DEALER: Dealer = {
    displayName: 'Dealer',
    cards: [],
    score: 0
}

const constants = {
    deckAPI: {
        DEFAULT_DECK_COUNT: 6,
        BASE_URL: 'https://deckofcardsapi.com/api/',
        GET_DECK: 'new/shuffle/'
    },
    game: {
        DEFAULT_PLAYER,
        DEFAULT_DEALER,
        NUM_STARTING_CARDS: 2
    }
};

export default constants;