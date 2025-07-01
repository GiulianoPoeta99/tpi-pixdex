import { PlayersService } from '../src/shared/services/playersService';

/**
 * Handler para la petición GET de jugadores y puntajes.
 * Devuelve la lista de jugadores desde la base de datos.
 *
 * @route GET /api/players
 * @returns {Promise<Response>} Respuesta JSON con los jugadores y sus puntajes.
 *
 * @example
 * fetch('/api/players')
 */
export async function GET() {
  try {
    const topPlayers = await PlayersService.getTopPlayers();
    return Response.json(topPlayers);
  } catch (error) {
    console.error('Error getting players:', error);
    return Response.json(
      { error: 'Error al obtener jugadores' },
      { status: 500 }
    );
  }
}
