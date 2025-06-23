import { topPlayers } from "../database/topPlayers";

/**
 * Handler para la petición GET de jugadores y puntajes.
 * Devuelve la lista de jugadores desde la base de datos local.
 *
 * @route GET /api/players
 * @returns {Response} Respuesta JSON con los jugadores y sus puntajes.
 *
 * @example
 * fetch('/api/players')
 */
export function GET() {
  return Response.json(topPlayers);
}
