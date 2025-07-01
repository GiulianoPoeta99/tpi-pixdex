import { contenidosAudiovisuales } from '../database/contenidosAudiovisuales';

/**
 * Handler para la petición GET de contenidos audiovisuales.
 * Devuelve la lista de contenidos desde la base de datos local.
 *
 * @route GET /api/contenidos
 * @returns {Response} Respuesta JSON con los contenidos audiovisuales.
 *
 * @example
 * fetch('/api/contenidos')
 */
export function GET() {
  return Response.json(contenidosAudiovisuales);
}
