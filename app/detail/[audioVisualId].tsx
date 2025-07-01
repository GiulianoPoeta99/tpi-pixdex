import { DetailScreen } from '@/src/detail/screens/DetailScreen';
import { useLocalSearchParams } from 'expo-router';

type DetailRouteParams = { audioVisualId: string };

/**
 * Pantalla de detalle para un contenido audiovisual.
 * Obtiene el ID del contenido desde los parámetros de la ruta y renderiza
 * la pantalla de detalle con la información específica del contenido.
 *
 * @component
 * @returns {JSX.Element} Pantalla de detalle del contenido audiovisual.
 *
 * @example
 * <DetailRoute />
 */
const DetailRoute = () => {
  const { audioVisualId } = useLocalSearchParams<DetailRouteParams>();

  return <DetailScreen audioVisualId={audioVisualId} />;
};

export default DetailRoute;
