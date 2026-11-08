"use client";

import { useState } from "react";
import { roll } from "../lib/games/registry";
import { Share } from "./share";

export function Playground({ origin }: { origin?: string }) {
  const [draw, setDraw] = useState<ReturnType<typeof roll>>();
  return (
    <>
      <button className="die" type="button" aria-label="掷骰子" onClick={() => setDraw(roll())}>
        <span className="face" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </span>
        <span>{draw ? "再掷一次" : "掷一下"}</span>
      </button>
      <div aria-live="polite">
        {draw && <section className="card"><h2>{draw.result.title}</h2><p>{draw.result.text}</p></section>}
      </div>
      <Share key={draw?.path} origin={origin} path={draw?.path ?? "/"} label={draw ? "复制这条结果链接" : "复制入口链接"} />
    </>
  );
}
