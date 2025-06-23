export interface ITopPlayer {
  id: number;
  name: string;
  score: number;
}

export const topPlayers: ITopPlayer[] = [
  { id: 1, name: "PixelMaster", score: 12 },
  { id: 2, name: "NinjaGamer", score: 10 },
  { id: 3, name: "MediaGuru", score: 8 },
  { id: 4, name: "TVFanatic", score: 7 },
  { id: 5, name: "AnimeWizard", score: 5 },
];
