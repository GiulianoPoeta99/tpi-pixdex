import { DetailScreen } from '@/src/detail/screens/DetailScreen';
import { useLocalSearchParams } from 'expo-router';

type DetailRouteParams = { audioVisualId: string };

/**
 * Página de detalle para un contenido audiovisual.
 * Obtiene el parámetro de la ruta y renderiza la pantalla de detalle.
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
