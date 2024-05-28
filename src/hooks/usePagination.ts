import { useState } from 'react';

const usePagination = (data: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return { currentData, currentPage, totalPages, setPage };
};

export default usePagination;
