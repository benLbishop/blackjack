import { Card } from './cardTypes';

export interface Player {
    id: string;
    displayName: string;
    cards: Card[];
    score: number;
}

export interface Dealer {
    displayName: string;
    cards: [] | [Card, Card];
    score: number;
}