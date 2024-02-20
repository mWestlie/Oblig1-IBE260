"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deck_1 = require("./deck");
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json()); //Middleware for å parse JSON-bodies
const players = []; //Array for på lagre spillerne
const teams = ["Nord", "Sør", "Øst", "Vest"]; //Mulige lag for spillerne
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
    //Finn spilleren som sender meldingen
    const player = players.find((p) => p.username === username);
    if (!player) {
        return res.status(404).send("Spiller ikke funnet");
    }
    //Legg til meldingen i spillerens message arraye
    player.messages.push(message);
    //Sender bekreft3lse til brukeren
    res.status(200).send(`Melding mottat fra ${username} (${team}): ${message}`);
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
