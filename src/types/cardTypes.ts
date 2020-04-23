export interface Card {
    image: string;
    value: CardValue;
    suit: Suit;
    code: string; // TODO: make enum?
}

export enum CardValue {
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE
}

export enum Suit {
    SPADES = 'SPADES',
    HEARTS = 'HEARTS',
    CLUBS = 'CLUBS',
    DIAMONDS = 'DIAMONDS'
}

export interface DeckMetaData {
    deck_id: string;
    remaining: number;
    shuffled: boolean;
}