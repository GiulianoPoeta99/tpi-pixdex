import { tiposContenidoAudiovisual } from '../database/tiposContenidoAudiovisual';

/**
 * Handler para la petición GET de tipos de contenido audiovisual.
 * Devuelve la lista de tipos desde la base de datos local.
 *
 * @route GET /api/tipos
 * @returns {Response} Respuesta JSON con los tipos de contenido audiovisual.
 *
 * @example
 * fetch('/api/tipos')
 */
export function GET() {
  return Response.json(tiposContenidoAudiovisual);
}
