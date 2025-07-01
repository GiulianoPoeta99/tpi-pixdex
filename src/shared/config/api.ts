import { API_URL, API_ENDPOINTS } from '../constants/Api';

/**
 * Configuración global para las rutas de la API de la aplicación.
 * @constant
 * @property {string} BASE_URL - URL base para las peticiones a la API.
 * @property {object} ENDPOINTS - Endpoints disponibles para los recursos principales.
 * @property {string} ENDPOINTS.CONTENIDOS - Endpoint para contenidos audiovisuales.
 * @property {string} ENDPOINTS.GENEROS - Endpoint para géneros audiovisuales.
 * @property {string} ENDPOINTS.TIPOS - Endpoint para tipos de contenido audiovisual.
 * @property {string} ENDPOINTS.PLAYERS - Endpoint para jugadores y puntajes.
 */
export const API_CONFIG = {
  BASE_URL: API_URL,
  ENDPOINTS: API_ENDPOINTS,
};
