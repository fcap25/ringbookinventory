// src/home/Home.tsx
import React, { useContext, useState } from 'react';
import { Box, Heading, VStack, HStack, Button, Select, Flex } from '@chakra-ui/react';
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
  const noAddRef = React.useRef(null);
  const filteredBooks = books.filter((book) => searchInventory(searchTerm, book));
  //const [searchTerm, setSearchTerm] = useState('' as string);

  return (
	<Flex position="relative" bgImage={HomeBg} bgPosition={"center"} bgSize={"cover"} h="100vh"> 
    <Box position={"absolute"} top="0" w="100%" h="100%" bgColor={"rgba(0, 0, 0, .5)"}>
	<Box display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"flex-start"} pt={20} zIndex={10}>
      <Heading color={"white"} fontSize="4xl" mb={6}>Book Inventory Management System</Heading>
      <BookSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
