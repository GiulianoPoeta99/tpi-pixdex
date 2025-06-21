import { IContenidoAudiovisual, contenidosAudiovisuales } from "../../../database/contenidosAudiovisuales";
import { API_CONFIG } from "../config/api";

export class ContenidosService {
  static async getAll(): Promise<IContenidoAudiovisual[]> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTENIDOS}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn('API not available, using local data:', error);
      // Fallback to local data when API is not available
      return contenidosAudiovisuales;
    }
  }

  static async getById(id: number): Promise<IContenidoAudiovisual> {
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

  static async getByTipoId(tipoId: number): Promise<IContenidoAudiovisual[]> {
    try {
      const contenidos = await this.getAll();
      return contenidos.filter(item => item.tipoId === tipoId);
    } catch (error) {
      console.error(`Error fetching contenidos by tipoId ${tipoId}:`, error);
      throw error;
    }
  }
} 