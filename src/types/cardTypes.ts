export enum CardValue {
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 10,
    QUEEN = 10,
    KING = 10,
    ACE = 11
}

export enum Suit {
    SPADES = 'SPADES',
    HEARTS = 'HEARTS',
    CLUBS = 'CLUBS',
    DIAMONDS = 'DIAMONDS'
}

export interface Card {
    image: string;
    value: CardValue;
    suit: Suit;
    code: string; // TODO: make enum?
}

export interface DeckMetaData {
    deck_id: string;
    remaining: number;
    shuffled: boolean;
}