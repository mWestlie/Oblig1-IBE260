"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//SERVER.TS
const express_1 = __importDefault(require("express"));
const deck_1 = require("./deck");
const messages_1 = require("./messages");
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json()); //Middleware for å parse JSON-bodies
const players = []; //Array for på lagre spillerne
const teams = ["Nord", "Sør", "Øst", "Vest"]; //Mulige lag for spillerne
const dealerIndex = 0;
const messageHandler = new messages_1.MessageHandler(players, dealerIndex);
//Post endepunkt for å registrere spillere
app.post("/register", (req, res) => {
    //Sjekker om det er 4 spillere registrert
    if (players.length >= 4) {
        return res.status(400).send("Maksimalt antall spillere er nådd");
    }
    //Henter brukernavn fra request body
    const { username } = req.body;
    //Sjekker om det er registrert brukernavn
    if (!username) {
        return res.status(400).send("Brukernavn er påkrevd!");
    }
    //Tildeler et lag til spilleren
    const newTeam = teams[players.length];
    const newPlayer = {
        username,
        team: newTeam,
        messages: [],
        cards: [],
    };
    players.push(newPlayer);
    //Sender bekfretelsen til brukeren
    res.status(200).send(`spiller ${username} (${newTeam}) er registrert`);
});
//Post endepunkt for å sende meldinger
app.post("/meldinger", (req, res) => {
    const { username, team, message } = req.body;
    const response = messageHandler.receiveMessage(username, message);
    res.send(response);
});
app.post("/nyRunde", (req, res) => {
    messageHandler.rotateDealer();
    res.status(200).send("En ny runde er startet og dealeren er rotert");
});
//Get endepunkt for å se spillerne
app.get("/spiller", (req, res) => {
    res.json(players);
});
//Endepunkt for å dele ut kort til spillerne
app.get("/dealcards", (req, res) => {
    if (players.length !== 4) {
        res
            .status(400)
            .send("Alle spiller må være registrert før kort kan deles ut");
    }
    (0, deck_1.dealCards)(players);
    res.status(200).send("Kort er delt ut til alle spillerne");
});
//SERVER START / INFO
app.get("/", (req, res) => {
    res.send("Bridge Game Server!");
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
