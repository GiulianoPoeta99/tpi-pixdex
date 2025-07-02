import { ITopPlayer, supabase } from '../config/supabase';

/**
 * Servicio para manejar los jugadores y sus puntajes usando Supabase.
 * Incluye funcionalidades de tiempo real para actualizaciones automáticas del scoreboard.
 * @class
 */
export class PlayersService {
  /**
   * Obtiene todos los jugadores ordenados por puntaje.
   * @returns {Promise<ITopPlayer[]>} Lista de jugadores ordenados por puntaje descendente.
   * @throws {Error} Si hay un error al obtener los datos.
   *
   * @example
   * const players = await PlayersService.getAll();
   */
  static async getAll(): Promise<ITopPlayer[]> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('score', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error getting players:', error);
      throw new Error('Error al obtener jugadores');
    }
  }

  /**
   * Obtiene un jugador por su ID.
   * @param {number} id - ID del jugador.
   * @returns {Promise<ITopPlayer | null>} Jugador encontrado o null.
   * @throws {Error} Si hay un error al obtener el jugador.
   *
   * @example
   * const player = await PlayersService.getById(1);
   */
  static async getById(id: number): Promise<ITopPlayer | null> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No encontrado
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error getting player by id:', error);
      throw new Error('Error al obtener jugador');
    }
  }

  /**
   * Obtiene un jugador por su nombre.
   * @param {string} name - Nombre del jugador.
   * @returns {Promise<ITopPlayer | null>} Jugador encontrado o null.
   * @throws {Error} Si hay un error al obtener el jugador.
   *
   * @example
   * const player = await PlayersService.getByName('PixelMaster');
   */
  static async getByName(name: string): Promise<ITopPlayer | null> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('name', name)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No encontrado
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error getting player by name:', error);
      throw new Error('Error al obtener jugador por nombre');
    }
  }

  /**
   * Crea un nuevo jugador o actualiza su puntaje si ya existe.
   * @param {string} name - Nombre del jugador.
   * @param {number} score - Puntaje del jugador.
   * @param {string} userId - ID del usuario autenticado (opcional).
   * @returns {Promise<ITopPlayer>} Jugador creado o actualizado.
   * @throws {Error} Si hay un error al crear o actualizar el jugador.
   *
   * @example
   * const player = await PlayersService.upsertPlayer('PixelMaster', 15, 'user123');
   */
  static async upsertPlayer(
    name: string,
    score: number,
    userId?: string
  ): Promise<ITopPlayer> {
    try {
      // Verificar si el jugador ya existe
      const existingPlayer = await this.getByName(name);

      if (existingPlayer) {
        // Actualizar puntaje si el nuevo es mayor
        if (score > existingPlayer.score) {
          const { data, error } = await supabase
            .from('players')
            .update({
              score,
              user_id: userId || existingPlayer.user_id,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingPlayer.id)
            .select()
            .single();

          if (error) {
            // Detectar errores específicos de RLS
            if (error.message.includes('row-level security policy')) {
              throw new Error('No tienes permisos para actualizar este jugador. Verifica que estés autenticado.');
            }
            throw new Error(error.message);
          }

          return data;
        }
        return existingPlayer;
      } else {
        // Crear nuevo jugador
        const { data, error } = await supabase
          .from('players')
          .insert({
            name,
            score,
            user_id: userId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          // Detectar errores específicos de RLS
          if (error.message.includes('row-level security policy')) {
            throw new Error('No tienes permisos para crear jugadores. Verifica que estés autenticado.');
          }
          throw new Error(error.message);
        }

        return data;
      }
    } catch (error) {
      console.error('Error upserting player:', error);
      throw new Error('Error al crear o actualizar jugador');
    }
  }

  /**
   * Elimina un jugador por su ID.
   * @param {number} id - ID del jugador a eliminar.
   * @returns {Promise<void>}
   * @throws {Error} Si hay un error al eliminar el jugador.
   *
   * @example
   * await PlayersService.deleteById(1);
   */
  static async deleteById(id: number): Promise<void> {
    try {
      const { error } = await supabase.from('players').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      throw new Error('Error al eliminar jugador');
    }
  }

  /**
   * Suscribe a cambios en tiempo real en la tabla de jugadores.
   * @param {(payload: any) => void} callback - Función callback para manejar cambios.
   * @returns {() => void} Función para cancelar la suscripción.
   *
   * @example
   * const unsubscribe = PlayersService.subscribeToChanges((payload) => {
   *   console.log('Players changed:', payload);
   * });
   */
  static subscribeToChanges(callback: (payload: any) => void): () => void {
    try {
      console.log('🔔 Iniciando suscripción en tiempo real para tabla players...');
      
      const subscription = supabase
        .channel('players_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'players',
          },
          (payload: any) => {
            console.log('📡 Evento Realtime recibido:', payload);

            // Normalizar el payload para manejar diferentes formatos
            const normalizedPayload = {
              eventType: payload.eventType || payload.event_type,
              new: payload.new,
              old: payload.old,
              table: payload.table,
              schema: payload.schema,
              commit_timestamp: payload.commit_timestamp,
            };

            console.log('📦 Payload normalizado:', normalizedPayload);
            callback(normalizedPayload);
          }
        )
        .subscribe((status) => {
          console.log('📡 Estado de suscripción players:', status);
          
          if (status === 'SUBSCRIBED') {
            console.log('✅ Suscripción a players activa');
          } else if (status === 'CHANNEL_ERROR') {
            console.error('❌ Error en canal de suscripción players');
          } else if (status === 'TIMED_OUT') {
            console.warn('⏰ Timeout en suscripción players');
          }
        });

      return () => {
        try {
          console.log('🔕 Desuscribiendo de players...');
          subscription.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing from players changes:', error);
        }
      };
    } catch (error) {
      console.error('Error setting up players subscription:', error);
      // Retornar función vacía en caso de error
      return () => {};
    }
  }

  /**
   * Obtiene los top 5 jugadores con mejor puntaje.
   * @returns {Promise<ITopPlayer[]>} Top 5 jugadores.
   * @throws {Error} Si hay un error al obtener los datos.
   *
   * @example
   * const topPlayers = await PlayersService.getTopPlayers();
   */
  static async getTopPlayers(): Promise<ITopPlayer[]> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('score', { ascending: false })
        .limit(5);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error getting top players:', error);
      throw new Error('Error al obtener top jugadores');
    }
  }
}
