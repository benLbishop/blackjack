import { createAction, ActionType } from 'typesafe-actions'
import { Card } from '../types/cardTypes';

const CARD_ADDED = 'CARD_ADDED';

export const cardActions = {
    cardAdded: createAction(
        CARD_ADDED,
        (playerId: string, card: Card) => ({ playerId, card })
    )()
}

export type CardAction = ActionType<typeof cardActions>;