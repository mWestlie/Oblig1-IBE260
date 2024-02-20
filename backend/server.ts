//SERVER.TS
import express, { Express, Request, Response } from "express";
import { Player } from "./players";
import { dealCards } from "./deck";
import { MessageHandler } from "./messages";

const app: Express = express();
const port = 8000;
app.use(express.json()); //Middleware for å parse JSON-bodies

const players: Player[] = []; //Array for på lagre spillerne
const teams = ["Nord", "Sør", "Øst", "Vest"]; //Mulige lag for spillerne
const dealerIndex = 0;
const messageHandler = new MessageHandler(players, dealerIndex);

//Post endepunkt for å registrere spillere
app.post("/register", (req: Request, res: Response) => {
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
	const newPlayer: Player = {
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
app.post("/meldinger", (req: Request, res: Response) => {
	const { username, team, message } = req.body;

	const response = messageHandler.receiveMessage(username, message);
	res.send(response);
});

app.post("/nyRunde", (req: Request, res: Response) => {
	messageHandler.rotateDealer();
	res.status(200).send("En ny runde er startet og dealeren er rotert");
});

//Get endepunkt for å se spillerne
app.get("/spiller", (req: Request, res: Response) => {
	res.json(players);
});

//Endepunkt for å dele ut kort til spillerne
app.get("/dealcards", (req: Request, res: Response) => {
	if (players.length !== 4) {
		res
			.status(400)
			.send("Alle spiller må være registrert før kort kan deles ut");
	}

	dealCards(players);
	res.status(200).send("Kort er delt ut til alle spillerne");
});

//SERVER START / INFO
app.get("/", (req: Request, res: Response) => {
	res.send("Bridge Game Server!");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
