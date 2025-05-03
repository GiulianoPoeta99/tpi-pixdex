import { DetailScreen } from "@/src/screens/detail/DetailScreen";
import { useLocalSearchParams } from "expo-router";

type DetailRouteParams = { audioVisualId: string };

const DetailRoute = () => {
    const { audioVisualId } = useLocalSearchParams<DetailRouteParams>();

    return <DetailScreen audioVisualId={audioVisualId}/>
}

export default DetailRoute;