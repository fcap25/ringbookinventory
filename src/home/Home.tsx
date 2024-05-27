// src/home/Home.tsx
import React, { useContext, useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, Flex } from '@chakra-ui/react';
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
import { BookContext } from '../contexts/BookContext';
import { HomeBg } from '../assets';

const Home: React.FC = () => {
  const { books, confirmAddBook, rateBook, deleteBook, isDuplicate, catchDupe, searchInventory } = useContext(BookContext)!;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCriteria, setFilterCriteria] = useState<string>('' as string);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [authors, setAuthors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const noAddRef = React.useRef(null);

  useEffect(() => {
    const authorList = Array.from(new Set(books.map(book => book.author)));
    setAuthors(authorList);
  }, [books]);

  useEffect(() => {
    if (filterCriteria === 'author') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [filterCriteria]);

  let filteredBooks = books.filter((book) => searchInventory(searchTerm, book));

  if (filterCriteria === 'author' && selectedAuthor) {
    filteredBooks = filteredBooks.filter((book) => book.author === selectedAuthor);
  } else if (filterCriteria === 'rating-high-to-low') {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  } else if (filterCriteria === 'rating-low-to-high') {
	filteredBooks.sort((a, b) => a.rating - b.rating);
  } else if (filterCriteria === 'recently-added') {
	filteredBooks = [...books].reverse();
  }

  return (
	<Flex flex={1} position="relative" bgImage={HomeBg} bgPosition={"center"} bgSize={"cover"} h="100vh" bgRepeat="no-repeat"> 
    <Box position={"absolute"} top="0" w="100%" h="100%" bgColor={"rgba(0, 0, 0, .5)"}>
	<Box display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"flex-start"} pt={10} zIndex={10} h="100%" maxH={"100vh"} overflowY={"scroll"}>
      <Heading color={"white"} fontSize="4xl" mb={6}>Book Inventory Management System</Heading>
      <BookSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} authors={authors} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} isOpen={isOpen} />
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
	  <BookList books={filteredBooks} rateBook={rateBook} deleteBook={deleteBook} />
	  </Box>
    </Box>
	</Flex>
  );
};

export default Home;
