import { Player, Dealer } from '../types/playerTypes';

const DEFAULT_PLAYER: Player = {
    id: '',
    displayName: 'default',
    cards: []
};

const DEFAULT_DEALER: Dealer = {
    displayName: 'Dealer',
    cards: []
}

const constants = {
    deckAPI: {
        DEFAULT_DECK_COUNT: 6,
        BASE_URL: 'https://deckofcardsapi.com/api/',
        GET_DECK: 'new/shuffle/'
    },
    game: {
        DEFAULT_PLAYER,
        DEFAULT_DEALER
    }
};

export default constants;