import { ITopPlayer, topPlayers } from "../data/topPlayers";

class PlayerRepository {
    private players: ITopPlayer[];

    constructor() {
        // Start with the initial fake data
        this.players = [...topPlayers];
    }

    getPlayers(): ITopPlayer[] {
        // Return players sorted by score in descending order
        return this.players.sort((a, b) => b.score - a.score);
    }

    addPlayerScore(name: string, score: number) {
        if (score === 0) return;

        const existingPlayerIndex = this.players.findIndex(p => p.name.toLowerCase() === name.toLowerCase());

        if (existingPlayerIndex !== -1) {
            // Player exists, update score only if it's higher
            if (score > this.players[existingPlayerIndex].score) {
                this.players[existingPlayerIndex].score = score;
            }
        } else {
            // New player, add to the list
            const newPlayer: ITopPlayer = {
                id: this.players.length + 1, // Simple ID generation
                name,
                score,
            };
            this.players.push(newPlayer);
        }

        // Keep the list sorted and, if desired, capped (e.g., top 10)
        this.players.sort((a, b) => b.score - a.score);
        // Example: if (this.players.length > 10) this.players.pop();
    }

    doesPlayerExist(name: string): boolean {
        return this.players.some(p => p.name.toLowerCase() === name.toLowerCase());
    }
}

// Export a singleton instance
export const playerRepository = new PlayerRepository(); 