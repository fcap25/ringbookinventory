import React, { useState } from 'react';
import { Box, Text, VStack, HStack, Button, Image, Collapse, useDisclosure } from '@chakra-ui/react';
import StarRating from "../components/StarRating"; // Assuming you have a StarRating component
import { Book } from '../types'
interface BookCardProps {
	book: Book;
	rateBook: (isbn: string, rating: number) => void;
	deleteBook: (isbn: string) => void;
}
  
  const BookCard: React.FC<BookCardProps> = ({ book, rateBook, deleteBook }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      p={4}
      w="fit-content"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      transition="all 0.3s ease-in-out"
      transform={isOpen ? 'scale(1.005)' : 'scale(1)'}
    >
      <VStack alignItems="center" transition="all 0.3s ease-in-out">
        {book.coverImage && (
          <Image
            src={book.coverImage}
            alt={book.title}
			borderRadius={"lg"}
            //style={{ width: '150px', height: '200px', objectFit: 'cover' }}
          />
        )}
        <Text color="white" fontSize="lg" fontWeight="bold" mt={2}>{book.title}</Text>
        <Text color="white">{book.author}</Text>
        <StarRating rating={book.rating} onRate={(rating) => rateBook(book.isbn, rating)} />
        <Collapse in={isOpen} animateOpacity unmountOnExit transition={{ exit: { delay: .25 }, enter: { duration: 0.4 } }}>
          <VStack>
            <Text color="white">ISBN: {book.isbn}</Text>
            <Button colorScheme="red" _hover={{transform: "translateY(-2px)"}} onClick={() => deleteBook(book.isbn)}>Delete</Button>
          </VStack>
		</Collapse>
      </VStack>
    </Box>
  );
};

export default BookCard;
