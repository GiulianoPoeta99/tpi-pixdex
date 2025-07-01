import { IContenidoAudiovisual } from '@/database/contenidosAudiovisuales';
import { IGeneroContenidoAudiovisual } from '@/database/generosContenidoAudiovisual';
import { ITipoContenidoAudiovisual } from '@/database/tiposContenidoAudiovisual';
import { ITopPlayer } from '@/src/shared/config/supabase';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ContenidosService } from '../services/contenidosService';
import { GenerosService } from '../services/generosService';
import { PlayersService } from '../services/playersService';
import { TiposService } from '../services/tiposService';
import { useAuth } from './AuthContext';

/**
 * Tipo de datos y métodos expuestos por el contexto de datos global.
 * @interface
 * @property {IContenidoAudiovisual[]} contenidos - Lista de contenidos audiovisuales.
 * @property {IGeneroContenidoAudiovisual[]} generos - Lista de géneros audiovisuales.
 * @property {ITipoContenidoAudiovisual[]} tipos - Lista de tipos de contenido audiovisual.
 * @property {ITopPlayer[]} players - Lista de jugadores y sus puntajes.
 * @property {object} loading - Estado de carga de cada recurso.
 * @property {object} errors - Estado de error de cada recurso.
 * @property {(id: number) => IContenidoAudiovisual | undefined} getContenidoById - Obtiene un contenido por ID.
 * @property {(tipoId: number) => IContenidoAudiovisual[]} getContenidosByTipoId - Obtiene contenidos por tipo.
 * @property {(id: number) => IGeneroContenidoAudiovisual | undefined} getGeneroById - Obtiene un género por ID.
 * @property {(ids: number[]) => IGeneroContenidoAudiovisual[]} getGenerosByIds - Obtiene géneros por IDs.
 * @property {(id: number) => ITipoContenidoAudiovisual | undefined} getTipoById - Obtiene un tipo por ID.
 * @property {(id: number) => ITopPlayer | undefined} getPlayerById - Obtiene un jugador por ID.
 * @property {() => Promise<void>} refreshContenidos - Refresca la lista de contenidos.
 * @property {() => Promise<void>} refreshGeneros - Refresca la lista de géneros.
 * @property {() => Promise<void>} refreshTipos - Refresca la lista de tipos.
 * @property {() => Promise<void>} refreshPlayers - Refresca la lista de jugadores.
 * @property {(name: string, score: number) => Promise<void>} addPlayerScore - Agrega o actualiza el puntaje de un jugador.
 * @property {(name: string) => boolean} doesPlayerExist - Verifica si existe un jugador por nombre.
 * @property {boolean} isInitialized - Indica si los datos iniciales ya fueron cargados.
 */
interface DataContextType {
  contenidos: IContenidoAudiovisual[];
  generos: IGeneroContenidoAudiovisual[];
  tipos: ITipoContenidoAudiovisual[];
  players: ITopPlayer[];

  loading: {
    contenidos: boolean;
    generos: boolean;
    tipos: boolean;
    players: boolean;
  };

  errors: {
    contenidos: string | null;
    generos: string | null;
    tipos: string | null;
    players: string | null;
  };

  getContenidoById: (id: number) => IContenidoAudiovisual | undefined;
  getContenidosByTipoId: (tipoId: number) => IContenidoAudiovisual[];
  getGeneroById: (id: number) => IGeneroContenidoAudiovisual | undefined;
  getGenerosByIds: (ids: number[]) => IGeneroContenidoAudiovisual[];
  getTipoById: (id: number) => ITipoContenidoAudiovisual | undefined;
  getPlayerById: (id: number) => ITopPlayer | undefined;

  refreshContenidos: () => Promise<void>;
  refreshGeneros: () => Promise<void>;
  refreshTipos: () => Promise<void>;
  refreshPlayers: () => Promise<void>;

  addPlayerScore: (name: string, score: number) => Promise<void>;
  doesPlayerExist: (name: string) => boolean;

  isInitialized: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * Proveedor de contexto global de datos para la aplicación.
 * Carga y expone los datos principales y utilidades para acceder y manipularlos.
 * Incluye funcionalidades de tiempo real para el scoreboard de jugadores.
 *
 * @component
 * @param {DataProviderProps} props - Propiedades del proveedor.
 * @param {ReactNode} props.children - Componentes hijos envueltos por el proveedor.
 * @returns {JSX.Element} Proveedor de contexto de datos.
 *
 * @example
 * <DataProvider>
 *   <App />
 * </DataProvider>
 */
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
  const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);
  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [players, setPlayers] = useState<ITopPlayer[]>([]);

  const [loading, setLoading] = useState({
    contenidos: false,
    generos: false,
    tipos: false,
    players: false,
  });

  const [errors, setErrors] = useState<{
    contenidos: string | null;
    generos: string | null;
    tipos: string | null;
    players: string | null;
  }>({
    contenidos: null,
    generos: null,
    tipos: null,
    players: null,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  const loadContenidos = async () => {
    try {
      setLoading(prev => ({ ...prev, contenidos: true }));
      setErrors(prev => ({ ...prev, contenidos: null }));

      const data = await ContenidosService.getAll();

      setContenidos(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      setErrors(prev => ({ ...prev, contenidos: errorMessage }));

      console.error('Error loading contenidos:', error);
    } finally {
      setLoading(prev => ({ ...prev, contenidos: false }));
    }
  };

  const loadGeneros = async () => {
    try {
      setLoading(prev => ({ ...prev, generos: true }));
      setErrors(prev => ({ ...prev, generos: null }));
      const data = await GenerosService.getAll();
      setGeneros(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      setErrors(prev => ({ ...prev, generos: errorMessage }));

      console.error('Error loading generos:', error);
    } finally {
      setLoading(prev => ({ ...prev, generos: false }));
    }
  };

  const loadTipos = async () => {
    try {
      setLoading(prev => ({ ...prev, tipos: true }));
      setErrors(prev => ({ ...prev, tipos: null }));

      const data = await TiposService.getAll();

      setTipos(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      setErrors(prev => ({ ...prev, tipos: errorMessage }));

      console.error('Error loading tipos:', error);
    } finally {
      setLoading(prev => ({ ...prev, tipos: false }));
    }
  };

  const loadPlayers = async () => {
    try {
      setLoading(prev => ({ ...prev, players: true }));
      setErrors(prev => ({ ...prev, players: null }));

      const data = await PlayersService.getAll();

      setPlayers(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      setErrors(prev => ({ ...prev, players: errorMessage }));

      console.error('Error loading players:', error);
    } finally {
      setLoading(prev => ({ ...prev, players: false }));
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([
        loadContenidos(),
        loadGeneros(),
        loadTipos(),
        loadPlayers(),
      ]);
      setIsInitialized(true);
    };

    initializeData();
  }, []);

  // Suscribirse a cambios en tiempo real del scoreboard
  useEffect(() => {
    const unsubscribe = PlayersService.subscribeToChanges((payload: any) => {
      console.log('Players changed:', payload);

      // En lugar de recargar toda la lista, actualizar solo el cambio específico
      if (payload.eventType === 'INSERT') {
        // Agregar nuevo jugador
        setPlayers(prev => {
          const newPlayer = payload.new;
          if (!newPlayer) return prev;

          // Verificar si ya existe para evitar duplicados
          const exists = prev.some(p => p.id === newPlayer.id);
          if (!exists) {
            return [...prev, newPlayer].sort((a, b) => b.score - a.score);
          }
          return prev;
        });
      } else if (payload.eventType === 'UPDATE') {
        // Actualizar jugador existente
        setPlayers(prev => {
          const updatedPlayer = payload.new;
          if (!updatedPlayer) return prev;

          return prev
            .map(p => (p.id === updatedPlayer.id ? updatedPlayer : p))
            .sort((a, b) => b.score - a.score);
        });
      } else if (payload.eventType === 'DELETE') {
        // Eliminar jugador
        setPlayers(prev => {
          const deletedPlayerId = payload.old?.id;
          if (!deletedPlayerId) return prev;

          return prev.filter(p => p.id !== deletedPlayerId);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getContenidoById = (id: number) => {
    return contenidos.find(item => item.id === id);
  };

  const getContenidosByTipoId = (tipoId: number) => {
    return contenidos.filter(item => item.tipoId === tipoId);
  };

  const getGeneroById = (id: number) => {
    return generos.find(item => item.id === id);
  };

  const getGenerosByIds = (ids: number[]) => {
    return generos.filter(item => ids.includes(item.id));
  };

  const getTipoById = (id: number) => {
    return tipos.find(item => item.id === id);
  };

  const getPlayerById = (id: number) => {
    return players.find(item => item.id === id);
  };

  const refreshContenidos = async () => {
    await loadContenidos();
  };

  const refreshGeneros = async () => {
    await loadGeneros();
  };

  const refreshTipos = async () => {
    await loadTipos();
  };

  const refreshPlayers = async () => {
    await loadPlayers();
  };

  const addPlayerScore = async (name: string, score: number) => {
    if (score === 0) return;

    try {
      // Usar el ID del usuario autenticado si está disponible
      const userId = user?.id;
      await PlayersService.upsertPlayer(name, score, userId);

      // Recargar la lista de jugadores para reflejar los cambios
      await loadPlayers();
    } catch (error) {
      console.error('Error adding player score:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setErrors(prev => ({ ...prev, players: errorMessage }));
    }
  };

  const doesPlayerExist = (name: string) => {
    return players.some(p => p.name.toLowerCase() === name.toLowerCase());
  };

  const value: DataContextType = {
    contenidos,
    generos,
    tipos,
    players,
    loading,
    errors,
    getContenidoById,
    getContenidosByTipoId,
    getGeneroById,
    getGenerosByIds,
    getTipoById,
    getPlayerById,
    refreshContenidos,
    refreshGeneros,
    refreshTipos,
    refreshPlayers,
    addPlayerScore,
    doesPlayerExist,
    isInitialized,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

/**
 * Hook para acceder al contexto global de datos de la aplicación.
 * Debe usarse dentro de un <DataProvider>.
 *
 * @returns {DataContextType} Contexto global de datos y utilidades.
 * @throws {Error} Si se usa fuera de un DataProvider.
 *
 * @example
 * const { contenidos, loading } = useData();
 */
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
