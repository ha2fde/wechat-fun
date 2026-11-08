export interface Result {
  id: string;
  title: string;
  text: string;
}

export interface Game {
  id: string;
  enabled: boolean;
  results: readonly [Result, ...Result[]];
}
