import {
  IContenidoAudiovisual,
  contenidosAudiovisuales,
} from "../../../database/contenidosAudiovisuales";
import { API_CONFIG } from "../config/api";

/**
 * Servicio para gestionar los contenidos audiovisuales.
 * Proporciona métodos para obtener todos los contenidos, uno por ID o varios por tipo, usando la API o datos locales de respaldo.
 *
 * @class
 */
export class ContenidosService {
  /**
   * Obtiene todos los contenidos audiovisuales desde la API o datos locales si falla.
   * @returns {Promise<IContenidoAudiovisual[]>} Lista de contenidos audiovisuales.
   */
  static async getAll(): Promise<IContenidoAudiovisual[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENIDOS}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return contenidosAudiovisuales;
    }
  }

  /**
   * Obtiene un contenido audiovisual por su ID.
   * @param {number} id - ID del contenido audiovisual.
   * @returns {Promise<IContenidoAudiovisual>} Contenido audiovisual encontrado.
   * @throws {Error} Si no se encuentra el contenido o hay un error en la petición.
   */
  static async getById(id: number): Promise<IContenidoAudiovisual> {
    try {
      const contenidos = await this.getAll();
      const contenido = contenidos.find((item) => item.id === id);

      if (!contenido) {
        throw new Error(`ContenidoAudiovisual with id ${id} not found`);
      }

      return contenido;
    } catch (error) {
      console.error(`Error fetching contenido with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene todos los contenidos audiovisuales de un tipo específico.
   * @param {number} tipoId - ID del tipo de contenido audiovisual.
   * @returns {Promise<IContenidoAudiovisual[]>} Lista de contenidos audiovisuales del tipo indicado.
   * @throws {Error} Si hay un error en la petición.
   */
  static async getByTipoId(tipoId: number): Promise<IContenidoAudiovisual[]> {
    try {
      const contenidos = await this.getAll();
      return contenidos.filter((item) => item.tipoId === tipoId);
    } catch (error) {
      console.error(`Error fetching contenidos by tipoId ${tipoId}:`, error);
      throw error;
    }
  }
}
