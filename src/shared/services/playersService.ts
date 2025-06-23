import { ITopPlayer, topPlayers } from "../../../database/topPlayers";
import { API_CONFIG } from "../config/api";

export class PlayersService {
  static async getAll(): Promise<ITopPlayer[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PLAYERS}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return topPlayers;
    }
  }

  static async getById(id: number): Promise<ITopPlayer> {
    try {
      const players = await this.getAll();
      const player = players.find((item) => item.id === id);

      if (!player) {
        throw new Error(`Player with id ${id} not found`);
      }

      return player;
    } catch (error) {
      console.error(`Error fetching player with id ${id}:`, error);
      throw error;
    }
  }
}
