import { generosContenidoAudiovisual } from "../database/generosContenidoAudiovisual";

export function GET() {
  return Response.json(generosContenidoAudiovisual);
}
