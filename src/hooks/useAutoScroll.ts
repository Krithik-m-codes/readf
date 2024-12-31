import { useEffect, RefObject } from 'react';

export const useAutoScroll = (
  pageRef: RefObject<HTMLDivElement>,
  isReading: boolean
) => {
  const scrollToNextPage = () => {
    if (pageRef.current) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'start',
      };
      pageRef.current.scrollIntoView(scrollOptions);
    }
  };

  useEffect(() => {
    if (isReading) {
      const timer = setTimeout(scrollToNextPage, 500);
      return () => clearTimeout(timer);
    }
  }, [isReading]);

  return { scrollToNextPage };
};