//PLAYERS.TS
import { Card } from "./deck";

export interface Player {
	username: string;
	team: string;
	messages: string[];
	cards: Card[];
}
