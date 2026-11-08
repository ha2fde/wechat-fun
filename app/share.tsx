"use client";

import { useState } from "react";

export function Share({ origin, path, label }: { origin?: string; path: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const [manualUrl, setManualUrl] = useState("");

  async function copy() {
    const url = new URL(path, origin || window.location.origin).href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setManualUrl(url);
    }
  }

  return (
    <div className="share">
      <button type="button" className="quiet" onClick={copy}>{label}</button>
      {copied && <span role="status">已复制</span>}
      {manualUrl && <label>长按复制链接<input readOnly value={manualUrl} onFocus={(event) => event.target.select()} /></label>}
    </div>
  );
}
