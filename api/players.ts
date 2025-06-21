import { topPlayers } from "../database/topPlayers";

export function GET() {
  return Response.json(topPlayers);
} 