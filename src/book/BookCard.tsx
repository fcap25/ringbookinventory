import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  Image,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import StarRating from '../components/StarRating';
import { Book } from '../types';
import BookModal from './BookModal';

interface BookCardProps {
  book: Book;
  rateBook: (isbn: string, rating: number) => void;
  deleteBook: (isbn: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, rateBook, deleteBook }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      p={4}
      w="fit-content"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      cursor="pointer"
      transition="all 0.3s ease-in-out"
      transform={isHovered ? 'scale(1.005)' : 'scale(1)'}
    >
      <VStack alignItems="center" transition="all 0.3s ease-in-out">
        {book.coverImage && (
          <Image src={book.coverImage} alt={book.title} borderRadius="lg" />
        )}
        <Text color="white" fontSize="lg" fontWeight="bold" mt={2}>
          {book.title}
        </Text>
        <Text color="white">{book.author}</Text>
        <StarRating rating={book.rating} onRate={(rating) => rateBook(book.isbn, rating)} />
        <Collapse animateOpacity in={isHovered} unmountOnExit>
          <VStack align="center">
            <Text color="white">ISBN: {book.isbn}</Text>
			<Text color="white">(Click To Add To a Bookshelf)</Text>
            <Button colorScheme="red" onClick={(e) => { e.stopPropagation(); deleteBook(book.isbn); }}>
              Delete
            </Button>
          </VStack>
        </Collapse>
      </VStack>
      <BookModal isOpen={isOpen} onClose={onClose} book={book} />
    </Box>
  );
};

export default BookCard;
