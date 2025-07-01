import {
  IContenidoAudiovisual,
  contenidosAudiovisuales,
} from '../../../database/contenidosAudiovisuales';
import { API_URLS } from '../constants/Api';
import { HttpService } from './httpService';

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
    await new Promise(r => setTimeout(r, 1000));

    const response = await HttpService.get<IContenidoAudiovisual[]>(
      API_URLS.CONTENIDOS
    );

    if (response.ok) {
      return response.data;
    }

    // Fallback a datos locales si la API falla
    console.warn('API falló, usando datos locales:', response.error);
    return contenidosAudiovisuales;
  }

  /**
   * Obtiene un contenido audiovisual por su ID.
   * @param {number} id - ID del contenido audiovisual.
   * @returns {Promise<IContenidoAudiovisual>} Contenido audiovisual encontrado.
   * @throws {Error} Si no se encuentra el contenido o hay un error en la petición.
   */
  static async getById(id: number): Promise<IContenidoAudiovisual> {
    await new Promise(r => setTimeout(r, 1000));
    try {
      const contenidos = await this.getAll();
      const contenido = contenidos.find(item => item.id === id);

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
    await new Promise(r => setTimeout(r, 1000));
    try {
      const contenidos = await this.getAll();
      return contenidos.filter(item => item.tipoId === tipoId);
    } catch (error) {
      console.error(`Error fetching contenidos by tipoId ${tipoId}:`, error);
      throw error;
    }
  }
}
