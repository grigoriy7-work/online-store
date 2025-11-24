import { useRef, useCallback } from 'react';

export const useScroll = (isLoading: boolean, hasMore: boolean, onLoad: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          onLoad();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onLoad],
  );

  return lastElementRef;
};
