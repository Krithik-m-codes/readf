import { useState } from 'react';

export const usePDFNavigation = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const nextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const prevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  return {
    numPages,
    setNumPages,
    pageNumber,
    setPageNumber,
    nextPage,
    prevPage,
  };
};