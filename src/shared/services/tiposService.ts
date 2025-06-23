import {
  ITipoContenidoAudiovisual,
  tiposContenidoAudiovisual,
} from "../../../database/tiposContenidoAudiovisual";
import { API_CONFIG } from "../config/api";

/**
 * Servicio para gestionar los tipos de contenido audiovisual.
 * Proporciona métodos para obtener todos los tipos o uno por ID, usando la API o datos locales de respaldo.
 *
 * @class
 */
export class TiposService {
  /**
   * Obtiene todos los tipos de contenido audiovisual desde la API o datos locales si falla.
   * @returns {Promise<ITipoContenidoAudiovisual[]>} Lista de tipos de contenido audiovisual.
   */
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

  /**
   * Obtiene un tipo de contenido audiovisual por su ID.
   * @param {number} id - ID del tipo de contenido audiovisual.
   * @returns {Promise<ITipoContenidoAudiovisual>} Tipo de contenido audiovisual encontrado.
   * @throws {Error} Si no se encuentra el tipo o hay un error en la petición.
   */
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
