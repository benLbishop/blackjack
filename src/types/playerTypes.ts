import { Card } from './cardTypes';

export interface Player {
    id: string;
    displayName: string;
    cards: Card[];
    score: number;
}

// TODO: get rid, or maybe have this extend player
// if I think Dealer could have additional fields
export interface Dealer {
    displayName: string;
    cards: Card[];
    score: number;
}