import { tinyBreak } from "./tiny-break.ts";
import type { Game } from "./types.ts";

export const games: readonly Game[] = [tinyBreak];

export const resultPath = (game: string, result: string) => `/r/${game}/${result}/`;

export function roll(random = Math.random) {
  const enabled = games.filter((game) => game.enabled);
  const game = enabled[Math.floor(random() * enabled.length)];
  const result = game.results[Math.floor(random() * game.results.length)];
  return { result, path: resultPath(game.id, result.id) };
}

export function findResult(gameId: string, resultId: string) {
  return games.find((game) => game.id === gameId)?.results.find((result) => result.id === resultId);
}
