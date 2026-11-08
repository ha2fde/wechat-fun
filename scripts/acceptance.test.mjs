import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";
import { findResult, games, resultPath, roll } from "../lib/games/registry.ts";

test("registry has at least one enabled game and stable unique slugs", () => {
  assert.ok(games.some((game) => game.enabled));
  assert.equal(new Set(games.map((game) => game.id)).size, games.length);
  for (const game of games) {
    assert.match(game.id, /^[a-z0-9-]+$/);
    assert.equal(new Set(game.results.map((result) => result.id)).size, game.results.length);
    for (const result of game.results) {
      assert.match(result.id, /^[a-z0-9-]+$/);
      assert.equal(findResult(game.id, result.id), result);
    }
  }
  assert.equal(findResult("missing", "missing"), undefined);
});

test("every enabled result can be rolled and has a matching direct link", () => {
  const enabled = games.filter((game) => game.enabled);
  enabled.forEach((game, gameIndex) => {
    game.results.forEach((result, resultIndex) => {
      const values = [(gameIndex + 0.5) / enabled.length, (resultIndex + 0.5) / game.results.length];
      assert.deepEqual(roll(() => values.shift()), { result, path: resultPath(game.id, result.id) });
    });
  });
});

test("static export includes home, every result, and a missing-page recovery link", async () => {
  const read = (path) => readFile(new URL(`../out/${path}`, import.meta.url), "utf8");
  const home = await read("index.html");
  assert.match(home, /玩点有趣的/);
  assert.match(home, /aria-label="掷骰子"/);
  assert.match(home, /复制入口链接/);
  for (const game of games) {
    for (const result of game.results) {
      const path = resultPath(game.id, result.id);
      const html = await read(`${path.slice(1)}index.html`);
      assert.ok(html.includes(result.title));
      assert.ok(html.includes(result.text));
      assert.ok(html.includes("复制这条结果链接"));
      assert.ok(html.includes('href="/"'));
    }
  }
  assert.match(await read("404.html"), /回首页掷一下/);
  await assert.rejects(access(new URL("../out/r/missing/missing/index.html", import.meta.url)), { code: "ENOENT" });
});
