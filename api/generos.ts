import { generosContenidoAudiovisual } from '../database/generosContenidoAudiovisual';

/**
 * Handler para la petición GET de géneros de contenido audiovisual.
 * Devuelve la lista de géneros desde la base de datos local.
 *
 * @route GET /api/generos
 * @returns {Response} Respuesta JSON con los géneros audiovisuales.
 *
 * @example
 * fetch('/api/generos')
 */
export function GET() {
  return Response.json(generosContenidoAudiovisual);
}
