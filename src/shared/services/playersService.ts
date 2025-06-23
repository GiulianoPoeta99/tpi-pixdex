import { ITopPlayer, topPlayers } from "../../../database/topPlayers";
import { API_CONFIG } from "../config/api";

/**
 * Servicio para gestionar los jugadores y sus puntajes.
 * Proporciona métodos para obtener todos los jugadores o uno por ID, usando la API o datos locales de respaldo.
 *
 * @class
 */
export class PlayersService {
  /**
   * Obtiene todos los jugadores desde la API o datos locales si falla.
   * @returns {Promise<ITopPlayer[]>} Lista de jugadores y sus puntajes.
   */
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

  /**
   * Obtiene un jugador por su ID.
   * @param {number} id - ID del jugador.
   * @returns {Promise<ITopPlayer>} Jugador encontrado.
   * @throws {Error} Si no se encuentra el jugador o hay un error en la petición.
   */
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
