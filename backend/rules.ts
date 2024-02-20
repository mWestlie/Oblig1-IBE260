//Bridge Regler
import { Player } from "./players";

export class BridgeRules {
	private players: Player[];
	private passCount: number;
	private currentBidderIndex: number;

	constructor(players: Player[]) {
		this.players = players;
		this.passCount = 0;
		this.currentBidderIndex = 0; //Index for den som starter budgivingen
	}
}
