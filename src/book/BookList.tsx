import React, { useState } from 'react';
import { Grid, GridItem, VStack,  Box  } from '@chakra-ui/react';
import { Book } from '../types';
import BookCard from './BookCard';
import usePagination from '../hooks/usePagination';
import { Pagination } from "../components";

interface BookListProps {
  books: Book[];
  rateBook: (isbn: string, rating: number) => void;
  deleteBook: (isbn: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, rateBook, deleteBook }) => {
  const booksPerPage = 12;
  const { currentData: currentBooks, currentPage, totalPages, setPage } = usePagination(books, booksPerPage);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <VStack spacing={4} w="100%" h="100%">
      <Grid
        templateColumns={{base:'repeat(2, 1fr)', md: 'repeat(3, 1fr)', xl:'repeat(6, 1fr)'}}
        templateRows={'repeat(2, 1fr)'}
        gap={{base: 2, md: 6}}
        w={{base:"auto", lg: "90%"}}
        h="auto"
        mt={10}
      >
        {currentBooks.map((book, index) => (
          <GridItem key={`${book.isbn}-${index}`} w="100%" h="fit-content">
            <BookCard
              book={book}
              rateBook={rateBook}
              deleteBook={deleteBook}
            />
          </GridItem>
        ))}
      </Grid>
	  <Box position="absolute" bottom="10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </VStack>
  );
};

export default BookList;
