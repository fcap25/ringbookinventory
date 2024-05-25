import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, VStack, HStack, Button, Select } from '@chakra-ui/react';
import { 
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
} from '@chakra-ui/react';
import BookSearch from '../book/BookSearch';
import BookList from '../book/BookList';
import { Book } from '../types';

const Home: React.FC = () => {
  const savedBooks = localStorage.getItem('books');
  const [books, setBooks] = useState<Book[]>(savedBooks ? JSON.parse(savedBooks) : []);
  const [duplicateBook, setDuplicateBook] = useState<Book | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const noAddRef = useRef(null);

  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (newBook: Book) => {
    const existingBook = books.find(
      book => book.title === newBook.title && book.author === newBook.author
    );

    if (existingBook) {
      setDuplicateBook(newBook);
      setIsDuplicate(true);
    } else {
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }
  };

  const confirmAddBook = () => {
    if (duplicateBook) {
      setBooks((prevBooks) => [...prevBooks, duplicateBook]);
      setDuplicateBook(null);
      setIsDuplicate(false);
    }
  };

  const rateBook = (isbn: string, rating: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === isbn ? { ...book, rating } : book
      )
    );
  };

  const deleteBook = (isbn: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn));
  };

  const catchDupe = () => {
	setIsDuplicate(false);
	setDuplicateBook(null);
  }

  return (
    <Box display={"flex"} w="100%" bgColor={"wheat"} flexDir={"column"} h="100vh" alignItems={"center"} justifyContent={"flex-start"} pt={10}>
      <Text fontSize="2xl" mb={4}>Book Inventory Management System</Text>
      <BookSearch addBook={addBook} />
        <AlertDialog leastDestructiveRef={noAddRef} isOpen={isDuplicate} onClose={catchDupe}>
		<AlertDialogOverlay>
		  <AlertDialogContent>
			<AlertDialogHeader fontSize="lg" fontWeight="bold">
			  Duplicate Book
			</AlertDialogHeader>
			<AlertDialogCloseButton />
			<AlertDialogBody>
			  A book with the same title and author already exists. Do you want to add this book anyway?
			</AlertDialogBody>
			<AlertDialogFooter w="100%">
			  <VStack w="100%" spacing={2}>
			  <Button colorScheme="green" onClick={confirmAddBook} w="full">
				Yes
			  </Button>
			  <Button ref={noAddRef} colorScheme="red" onClick={catchDupe} w="full">
				No
			  </Button>
			  </VStack>
			</AlertDialogFooter>
		  </AlertDialogContent>
		</AlertDialogOverlay>
        </AlertDialog>
      <BookList books={books} rateBook={rateBook} deleteBook={deleteBook} />
    </Box>
  );
};



export default Home;
