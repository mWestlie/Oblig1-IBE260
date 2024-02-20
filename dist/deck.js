"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealCards = exports.shuffleDeck = exports.createDeck = void 0;
//Funksjon for å generere en full kortstokk
function createDeck() {
    const symboler = ["Hjerte", "Kløver", "Spar", "Ruter"];
    const values = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Knekt",
        "Dame",
        "Konge",
        "Ess",
    ];
    let deck = [];
    //Lager alle kombinasjoer av symboler og verdier
    for (let symbol of symboler) {
        for (let value of values) {
            deck.push({ symbol, value });
        }
    }
    return deck; //Returnerer den ferdige kortstokken
}
exports.createDeck = createDeck;
//Funksjon for å blande kortstokken
function shuffleDeck(deck) {
    //Går igjennom kortstokken og bytter hvert kort med et tilfeldig valgt kort
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; //Bytter kortene
    }
}
exports.shuffleDeck = shuffleDeck;
//Funksjon for å dele ut kort til spillerne
function dealCards(players) {
    let deck = createDeck();
    shuffleDeck(deck);
    //deler ut kort til spillerne, 13 til hver.
    for (let i = 0; i < deck.length; i++) {
        players[i % 4].cards.push(deck[i]);
    }
}
exports.dealCards = dealCards;
