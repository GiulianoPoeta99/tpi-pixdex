import { tiposContenidoAudiovisual } from "../database/tiposContenidoAudiovisual";

export function GET() {
  return Response.json(tiposContenidoAudiovisual);
}
