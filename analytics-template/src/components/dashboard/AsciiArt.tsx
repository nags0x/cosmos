"use client";

import { useEffect, useState } from "react";

const ART_SATELLITE = `
      .  .
    .. .  .
   .. .  .
  .. .  .
   ... .
     ..
      .
     / \\
    |   |
  --|---|--
    |   |
     \\ /
      '
`;

export function AsciiArt() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 2);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] leading-[10px] text-foreground/50 select-none pointer-events-none opacity-50 dark:opacity-30">
      <pre className="animate-pulse">{ART_SATELLITE}</pre>
    </div>
  );
}
