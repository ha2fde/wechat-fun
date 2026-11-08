import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Share } from "../../../share";
import { follow, productionOrigin, title } from "../../../../lib/config";
import { findResult, games, resultPath } from "../../../../lib/games/registry";

type Props = { params: Promise<{ game: string; result: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return games.flatMap((game) => game.results.map((result) => ({ game: game.id, result: result.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, result } = await params;
  const item = findResult(game, result);
  if (!item) notFound();
  const path = resultPath(game, result);
  return {
    title: `${item.title} · ${title}`,
    description: item.text,
    alternates: productionOrigin ? { canonical: path } : undefined,
  };
}

export default async function ResultPage({ params }: Props) {
  const { game, result } = await params;
  const item = findResult(game, result);
  if (!item) notFound();
  return (
    <main>
      <header><p className="eyebrow">{title}</p><h1>{item.title}</h1></header>
      <section className="card"><p>{item.text}</p></section>
      <a className="primary" href="/">我也掷一下</a>
      <Share origin={productionOrigin} path={resultPath(game, result)} label="复制这条结果链接" />
      {follow.url && <footer><a href={follow.url}>关注{follow.name || "公众号"}</a></footer>}
    </main>
  );
}
