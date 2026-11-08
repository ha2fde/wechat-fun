import type { Metadata } from "next";
import { description, productionOrigin, title } from "../lib/config";
import "./style.css";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: productionOrigin ? new URL(productionOrigin) : undefined,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
