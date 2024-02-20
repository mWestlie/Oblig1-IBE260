"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeRules = void 0;
class BridgeRules {
    constructor(players) {
        this.players = players;
        this.passCount = 0;
        this.currentBidderIndex = 0; //Index for den som starter budgivingen
    }
}
exports.BridgeRules = BridgeRules;
