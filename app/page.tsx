import type { Metadata } from "next";
import { description, follow, productionOrigin, title } from "../lib/config";
import { Playground } from "./playground";

export const metadata: Metadata = productionOrigin ? { alternates: { canonical: "/" } } : {};

export default function Home() {
  return (
    <main>
      <header><p className="eyebrow">给自己放个小假</p><h1>{title.replace("🎲 ", "")}</h1><p>{description}</p></header>
      <Playground origin={productionOrigin} />
      <footer>
        {follow.url && <a href={follow.url}>关注{follow.name || "公众号"}</a>}
        <p>无需登录，打开就能玩。</p>
      </footer>
    </main>
  );
}
