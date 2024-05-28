import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Checkbox,
} from '@chakra-ui/react';
import { Book, Bookshelf } from '../types';
import { useBookshelf } from '../contexts/BookshelfContext';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, book }) => {
  const { bookshelves, addBookToBookshelf, removeBookFromBookshelf } = useBookshelf();

  const handleBookshelfChange = (bookshelf: string, isChecked: boolean) => {
    if (isChecked) {
		addBookToBookshelf(book.isbn, bookshelf);
    } else {
      removeBookFromBookshelf(book.isbn, bookshelf);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{book.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start">
            <Text>Author: {book.author}</Text>
            <Text>ISBN: {book.isbn}</Text>
            <Text>Rating: {book.rating}</Text>
            <Text>Bookshelves:</Text>
            {bookshelves.map((shelf) => (
              <Checkbox
                key={shelf.name}
                isChecked={shelf.books.includes(book.isbn)}
                onChange={(e) =>
                  handleBookshelfChange(shelf.name, e.target.checked)
                }
              >
                {shelf.name}
              </Checkbox>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookModal;
