import { contenidosAudiovisuales } from "../database/contenidosAudiovisuales";

export function GET() {
  return Response.json(contenidosAudiovisuales);
}
