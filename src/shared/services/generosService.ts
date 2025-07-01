import {
  IGeneroContenidoAudiovisual,
  generosContenidoAudiovisual,
} from '../../../database/generosContenidoAudiovisual';
import { API_URLS } from '../constants/Api';
import { HttpService } from './httpService';

/**
 * Servicio para gestionar los géneros de contenido audiovisual.
 * Proporciona métodos para obtener todos los géneros, uno por ID o varios por IDs, usando la API o datos locales de respaldo.
 *
 * @class
 */
export class GenerosService {
  /**
   * Obtiene todos los géneros desde la API o datos locales si falla.
   * @returns {Promise<IGeneroContenidoAudiovisual[]>} Lista de géneros audiovisuales.
   */
  static async getAll(): Promise<IGeneroContenidoAudiovisual[]> {
    await new Promise(r => setTimeout(r, 1000));

    const response = await HttpService.get<IGeneroContenidoAudiovisual[]>(
      API_URLS.GENEROS
    );

    if (response.ok) {
      return response.data;
    }

    // Fallback a datos locales si la API falla
    console.warn('API falló, usando datos locales:', response.error);
    return generosContenidoAudiovisual;
  }

  /**
   * Obtiene un género por su ID.
   * @param {number} id - ID del género audiovisual.
   * @returns {Promise<IGeneroContenidoAudiovisual>} Género encontrado.
   * @throws {Error} Si no se encuentra el género o hay un error en la petición.
   */
  static async getById(id: number): Promise<IGeneroContenidoAudiovisual> {
    await new Promise(r => setTimeout(r, 1000));
    try {
      const generos = await this.getAll();
      const genero = generos.find(item => item.id === id);

      if (!genero) {
        throw new Error(`Genero with id ${id} not found`);
      }

      return genero;
    } catch (error) {
      console.error(`Error fetching genero with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene varios géneros por sus IDs.
   * @param {number[]} ids - IDs de los géneros audiovisuales.
   * @returns {Promise<IGeneroContenidoAudiovisual[]>} Lista de géneros encontrados.
   * @throws {Error} Si hay un error en la petición.
   */
  static async getByIds(ids: number[]): Promise<IGeneroContenidoAudiovisual[]> {
    await new Promise(r => setTimeout(r, 1000));
    try {
      const generos = await this.getAll();
      return generos.filter(item => ids.includes(item.id));
    } catch (error) {
      console.error(`Error fetching generos by ids ${ids}:`, error);
      throw error;
    }
  }
}
