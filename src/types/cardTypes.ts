export interface Card {
    image: string;
    value: CardValue;
    suit: Suit;
    code?: string; // TODO
}

export enum CardValue {
    ACE_LOW = 1,
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
    ACE_HIGH
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