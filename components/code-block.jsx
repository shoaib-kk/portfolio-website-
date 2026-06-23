"use client";

import { useRef, useState } from "react";

export function CodeBlock({ children, ...props }) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const code = preRef.current?.innerText || "";
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-block-shell">
      <button type="button" className="copy-code" onClick={copyCode}>
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={preRef} {...props}>{children}</pre>
    </div>
  );
}
