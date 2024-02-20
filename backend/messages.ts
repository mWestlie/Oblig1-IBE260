//MESSAGES.TS
import { Player } from "./players";

export class MessageHandler {
	private players: Player[];
	private dealerIndex: number;
	private currentPlayerIndex: number;
	private passCount: number;
	private isBiddingComplete: boolean;

	constructor(players: Player[], dealerIndex: number = 0) {
		this.players = players; //Initiliserer listen av spillerne
		this.dealerIndex = dealerIndex; // Dealerens posisjone som roterer etter hver hånd
		this.currentPlayerIndex = (dealerIndex + 1) % players.length; //Starter med spilleren til venstre for dealeren
		this.passCount = 0; //Teller påfølgende pass
		this.isBiddingComplete = false; //Følger med på om meldingsrunden er avsluttet
	}

	public receiveMessage(username: string, message: string): string {
		// Forsikre deg om at spillere-arrayet er korrekt initialisert og inneholder spillerobjekter
		if (!this.players || this.players.length === 0) {
			return "Ingen spillere er registrert ennå.";
		}

		if (this.isBiddingComplete) {
			return "Budgivningen er allerede avsluttet.";
		}

		const player = this.players.find((p) => p.username === username);
		if (!player) {
			return "Spiller ikke funnet";
		}

		//Sjekker om det er spillerens tur
		if (player.username !== this.players[this.currentPlayerIndex].username) {
			return "Det er ikke din tur";
		}

		//Legger til meldingen i spillerens historikk
		player.messages.push(message);

		//Logikk for meldingsrunden
		if (message.toLowerCase() === "pass") {
			this.passCount++;
			if (this.passCount === 3) {
				this.isBiddingComplete = true;
				return "Meldingsrunden er avsluttet etter 3 pass.";
			}
		} else {
			this.passCount = 0;
		}

		//Går til neste spiller
		this.currentPlayerIndex =
			(this.currentPlayerIndex + 1) % this.players.length;
		return `Melding: ${message} mottatt fra ${username}`;
	}
	//Funksjon for å sjekke om budgivningen er fullført
	public biddingIsComplete(): boolean {
		return this.isBiddingComplete;
	}

	//metode for å rotere dealeren
	public rotateDealer() {
		this.dealerIndex = (this.dealerIndex + 1) % this.players.length;
		this.currentPlayerIndex = (this.dealerIndex + 1) % this.players.length;
		this.isBiddingComplete = false; //Resetter status for ny runde
		this.passCount = 0; //Resetter pass teller for ny runde
	}
}
// 		const player = this.players[this.currentPlayerIndex];
// 		if (player.username !== username) {
// 			return "Det er ikke din tur"; //Sjekker at riktig spiller sender melding
// 		}
// 		player.messages.push(message); //Legger meldingen til spillerens historikk

// 		//Håndterer logikken for 'pass'
// 		if (message.toLowerCase() === "pass") {
// 			this.passCount++;
// 			if (this.passCount === 3) {
// 				return "Meldingsrunde avsluttet etter 3 pass";
// 			}
// 		} else {
// 			this.passCount = 0; //Reset for teller hvis neste melding ikke var pass
// 		}
// 		this.currentPlayerIndex =
// 			(this.currentPlayerIndex + 1) % this.players.length; //Går til neste spiller
// 		return `Melding mottatt fra ${username}: ${message}`;
// 	}
// }
