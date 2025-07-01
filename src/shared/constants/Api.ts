/**
 * Configuración de la API de la aplicación.
 * @constant
 * @property {string} API_URL - URL base para las llamadas a la API obtenida desde variables de entorno.
 * @property {string} API_URL_FALLBACK - URL de respaldo en caso de que no esté configurada la variable de entorno.
 */
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081';

/**
 * Endpoints de la API de la aplicación.
 * @constant
 * @property {string} CONTENIDOS - Endpoint para contenidos audiovisuales.
 * @property {string} GENEROS - Endpoint para géneros audiovisuales.
 * @property {string} TIPOS - Endpoint para tipos de contenido audiovisual.
 * @property {string} PLAYERS - Endpoint para jugadores y puntajes.
 */
export const API_ENDPOINTS = {
  CONTENIDOS: '/api/contenidos',
  GENEROS: '/api/generos',
  TIPOS: '/api/tipos',
  PLAYERS: '/api/players',
} as const;

/**
 * URLs completas para cada endpoint de la API.
 * @constant
 * @property {string} CONTENIDOS - URL completa para contenidos audiovisuales.
 * @property {string} GENEROS - URL completa para géneros audiovisuales.
 * @property {string} TIPOS - URL completa para tipos de contenido audiovisual.
 * @property {string} PLAYERS - URL completa para jugadores y puntajes.
 */
export const API_URLS = {
  CONTENIDOS: `${API_URL}${API_ENDPOINTS.CONTENIDOS}`,
  GENEROS: `${API_URL}${API_ENDPOINTS.GENEROS}`,
  TIPOS: `${API_URL}${API_ENDPOINTS.TIPOS}`,
  PLAYERS: `${API_URL}${API_ENDPOINTS.PLAYERS}`,
} as const;
