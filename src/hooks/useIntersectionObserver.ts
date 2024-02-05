import { RefObject, useEffect, useState } from "react";

export default function useIntersectionObserver(
  elemnetRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0%" }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elemnetRef.current;
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);
    observer.observe(node);

    return () => observer.disconnect();
  }, [elemnetRef?.current, JSON.stringify(threshold), root, rootMargin]);

  return entry;
}
