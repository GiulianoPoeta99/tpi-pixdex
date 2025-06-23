import {
  IGeneroContenidoAudiovisual,
  generosContenidoAudiovisual,
} from "../../../database/generosContenidoAudiovisual";
import { API_CONFIG } from "../config/api";

export class GenerosService {
  static async getAll(): Promise<IGeneroContenidoAudiovisual[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENEROS}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return generosContenidoAudiovisual;
    }
  }

  static async getById(id: number): Promise<IGeneroContenidoAudiovisual> {
    try {
      const generos = await this.getAll();
      const genero = generos.find((item) => item.id === id);

      if (!genero) {
        throw new Error(`Genero with id ${id} not found`);
      }

      return genero;
    } catch (error) {
      console.error(`Error fetching genero with id ${id}:`, error);
      throw error;
    }
  }

  static async getByIds(ids: number[]): Promise<IGeneroContenidoAudiovisual[]> {
    try {
      const generos = await this.getAll();
      return generos.filter((item) => ids.includes(item.id));
    } catch (error) {
      console.error(`Error fetching generos by ids ${ids}:`, error);
      throw error;
    }
  }
}
