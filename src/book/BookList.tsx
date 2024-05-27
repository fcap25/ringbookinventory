import React, { useState } from 'react';
import { Grid, GridItem, VStack, Button, HStack } from '@chakra-ui/react';
import { Book } from '../types';
import BookCard from './BookCard';
import usePagination from '../hooks/usePagination';

interface BookListProps {
  books: Book[];
  rateBook: (isbn: string, rating: number) => void;
  deleteBook: (isbn: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, rateBook, deleteBook }) => {
  const booksPerPage = 12;
  const { currentData: currentBooks, currentPage, totalPages, nextPage, prevPage } = usePagination(books, booksPerPage);

  return (
    <VStack spacing={4} w="100%" h="100%">
      <Grid
        templateColumns={'repeat(6, 1fr)'}
        templateRows={'repeat(2, 1fr)'}
        gap={6}
        w="90%"
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
      <HStack position={"absolute"} bottom="10">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export default BookList;
