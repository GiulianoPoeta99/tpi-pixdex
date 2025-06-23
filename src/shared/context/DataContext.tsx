import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IContenidoAudiovisual } from "@/database/contenidosAudiovisuales";
import { IGeneroContenidoAudiovisual } from "@/database/generosContenidoAudiovisual";
import { ITipoContenidoAudiovisual } from "@/database/tiposContenidoAudiovisual";
import { ITopPlayer } from "@/database/topPlayers";
import { ContenidosService } from "../services/contenidosService";
import { GenerosService } from "../services/generosService";
import { TiposService } from "../services/tiposService";
import { PlayersService } from "../services/playersService";

interface DataContextType {
  // Estados de datos
  contenidos: IContenidoAudiovisual[];
  generos: IGeneroContenidoAudiovisual[];
  tipos: ITipoContenidoAudiovisual[];
  players: ITopPlayer[];

  // Estados de carga
  loading: {
    contenidos: boolean;
    generos: boolean;
    tipos: boolean;
    players: boolean;
  };

  // Estados de error
  errors: {
    contenidos: string | null;
    generos: string | null;
    tipos: string | null;
    players: string | null;
  };

  // Métodos para obtener datos específicos
  getContenidoById: (id: number) => IContenidoAudiovisual | undefined;
  getContenidosByTipoId: (tipoId: number) => IContenidoAudiovisual[];
  getGeneroById: (id: number) => IGeneroContenidoAudiovisual | undefined;
  getGenerosByIds: (ids: number[]) => IGeneroContenidoAudiovisual[];
  getTipoById: (id: number) => ITipoContenidoAudiovisual | undefined;
  getPlayerById: (id: number) => ITopPlayer | undefined;

  // Métodos para refrescar datos
  refreshContenidos: () => Promise<void>;
  refreshGeneros: () => Promise<void>;
  refreshTipos: () => Promise<void>;
  refreshPlayers: () => Promise<void>;

  // Métodos para el juego
  addPlayerScore: (name: string, score: number) => void;
  doesPlayerExist: (name: string) => boolean;

  // Estado general
  isInitialized: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Estados de datos
  const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
  const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);
  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [players, setPlayers] = useState<ITopPlayer[]>([]);

  // Estados de carga
  const [loading, setLoading] = useState({
    contenidos: false,
    generos: false,
    tipos: false,
    players: false,
  });

  // Estados de error
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

  // Función para cargar contenidos
  const loadContenidos = async () => {
    try {
      setLoading((prev) => ({ ...prev, contenidos: true }));
      setErrors((prev) => ({ ...prev, contenidos: null }));
      const data = await ContenidosService.getAll();
      setContenidos(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setErrors((prev) => ({ ...prev, contenidos: errorMessage }));
      console.error("Error loading contenidos:", error);
    } finally {
      setLoading((prev) => ({ ...prev, contenidos: false }));
    }
  };

  // Función para cargar géneros
  const loadGeneros = async () => {
    try {
      setLoading((prev) => ({ ...prev, generos: true }));
      setErrors((prev) => ({ ...prev, generos: null }));
      const data = await GenerosService.getAll();
      setGeneros(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setErrors((prev) => ({ ...prev, generos: errorMessage }));
      console.error("Error loading generos:", error);
    } finally {
      setLoading((prev) => ({ ...prev, generos: false }));
    }
  };

  // Función para cargar tipos
  const loadTipos = async () => {
    try {
      setLoading((prev) => ({ ...prev, tipos: true }));
      setErrors((prev) => ({ ...prev, tipos: null }));
      const data = await TiposService.getAll();
      setTipos(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setErrors((prev) => ({ ...prev, tipos: errorMessage }));
      console.error("Error loading tipos:", error);
    } finally {
      setLoading((prev) => ({ ...prev, tipos: false }));
    }
  };

  // Función para cargar players
  const loadPlayers = async () => {
    try {
      setLoading((prev) => ({ ...prev, players: true }));
      setErrors((prev) => ({ ...prev, players: null }));
      const data = await PlayersService.getAll();
      setPlayers(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setErrors((prev) => ({ ...prev, players: errorMessage }));
      console.error("Error loading players:", error);
    } finally {
      setLoading((prev) => ({ ...prev, players: false }));
    }
  };

  // Cargar todos los datos al inicializar
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

  // Métodos para obtener datos específicos
  const getContenidoById = (id: number) => {
    return contenidos.find((item) => item.id === id);
  };

  const getContenidosByTipoId = (tipoId: number) => {
    return contenidos.filter((item) => item.tipoId === tipoId);
  };

  const getGeneroById = (id: number) => {
    return generos.find((item) => item.id === id);
  };

  const getGenerosByIds = (ids: number[]) => {
    return generos.filter((item) => ids.includes(item.id));
  };

  const getTipoById = (id: number) => {
    return tipos.find((item) => item.id === id);
  };

  const getPlayerById = (id: number) => {
    return players.find((item) => item.id === id);
  };

  // Métodos para refrescar datos
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

  // Métodos para el juego
  const addPlayerScore = (name: string, score: number) => {
    if (score === 0) return;

    const existingPlayerIndex = players.findIndex(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );

    if (existingPlayerIndex !== -1) {
      // Player exists, update score only if it's higher
      if (score > players[existingPlayerIndex].score) {
        const updatedPlayers = [...players];
        updatedPlayers[existingPlayerIndex].score = score;
        setPlayers(updatedPlayers);
      }
    } else {
      // New player, add to the list
      const newPlayer: ITopPlayer = {
        id: players.length + 1, // Simple ID generation
        name,
        score,
      };
      setPlayers((prev) => [...prev, newPlayer]);
    }
  };

  const doesPlayerExist = (name: string) => {
    return players.some((p) => p.name.toLowerCase() === name.toLowerCase());
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

// Hook personalizado para usar el contexto
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
