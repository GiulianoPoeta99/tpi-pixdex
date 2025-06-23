import {
  ITipoContenidoAudiovisual,
  tiposContenidoAudiovisual,
} from "../../../database/tiposContenidoAudiovisual";
import { API_CONFIG } from "../config/api";

export class TiposService {
  static async getAll(): Promise<ITipoContenidoAudiovisual[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TIPOS}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return tiposContenidoAudiovisual;
    }
  }

  static async getById(id: number): Promise<ITipoContenidoAudiovisual> {
    try {
      const tipos = await this.getAll();
      const tipo = tipos.find((item) => item.id === id);

      if (!tipo) {
        throw new Error(`Tipo with id ${id} not found`);
      }

      return tipo;
    } catch (error) {
      console.error(`Error fetching tipo with id ${id}:`, error);
      throw error;
    }
  }
}
