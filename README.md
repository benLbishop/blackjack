# Blackjack

## Running

- clone the repository
- in the directory, run `yarn`
- run `yarn start`

The blackjack game should appear in your browser at localhost:3000.

## TODOs

- Write tests for lib functions
- Move Dealer/Player into one class
- Disable hit button while card is being fetched
- Make a key for cards, since I can get the exact same card in the same hand

## Implementation

### Gameplan:

#### Visuals

The top level component should be a "Game" or something of that sort, which will hold a dealer, a list of players, a deck, and maybe some others.

I'll need a Dealer component and a Player component (these could probably be one component with different props, but it'll be easier to keep them separate for the time frame).

The Dealer component will only need a list of two cards, as well as some kind of name identifying it as the Dealer.

The Player should be set up to easily expand the game to more than 1 player, if desired. It should have an id, a name, a list of cards (can be up to 11 I guess. If you're playing blackjack with 3+ decks, you could get 11 aces, one valued at 11 and 10 at 1). They also will need buttons for hitting and staying.

The Card class should be a div that renders an image. A value might be helpful for a tooltip or something of the sort.

I'll need a component for the end of the game, which will render a won or lost message as appropriate, and have a 'start new game' button.

I think that's the basics, I'll add more later.

#### Logic
For  the logic:

I'll need to initially create a deck with a count of 6, probably when the Game component mounts. Initially we have two cards for the dealer and two for each player; I could do this in separate queries for clarity, but it's more efficient to just query for the number of cards I need at once and divy them up after receiving them. I'll have a function that takes in numPlayers and will fetch 2 * (numPlayers + 1) (+1 for dealer) and distribute them appropriately afterwords.

If a player calls 'hit', I'll need to make a request for a new card. I should make the hit button disabled while the request is processing so they can't hit multiple times.

At the start of the game, I still need to check for a loss condition - the dealer could be dealt 21, which means the game is over. Additionally, after each hit, I need to check if the game is over, and if the player says stand, I need to check if the game is over.

That's the basics, so I'll try to get that set up now.

#### Additional Technologies Used

- Typescript
- Redux and related libraries
- Axios for fetch requests
- Tailwind CSS