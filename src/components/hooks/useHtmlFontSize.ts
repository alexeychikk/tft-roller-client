import { useEffect, useState } from 'react';

export function useHtmlFontSize() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const rootElement = document.getElementById('root')!;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentBoxSize?.[0]?.inlineSize;
        if (!width) continue;
        document.documentElement.style.fontSize = `${(width / 100).toFixed(
          2,
        )}px`;
        if (!isReady && isMounted) setIsReady(true);
      }
    });
    resizeObserver.observe(rootElement);

    return () => {
      isMounted = false;
      resizeObserver.disconnect();
    };
  }, []);

  return isReady;
}
