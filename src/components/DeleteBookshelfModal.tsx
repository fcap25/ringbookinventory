import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useBookshelf } from '../contexts/BookshelfContext';

interface DeleteBookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteBookshelfModal: React.FC<DeleteBookshelfModalProps> = ({ isOpen, onClose }) => {
  const { bookshelves, deleteBookshelf } = useBookshelf();
  const [selectedBookshelf, setSelectedBookshelf] = useState('');
  const toast = useToast();

  const handleDelete = () => {
    if (selectedBookshelf === '') {
      toast({
        title: 'Invalid selection',
        description: 'Please select a bookshelf to delete.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    deleteBookshelf(selectedBookshelf);
    toast({
      title: 'Bookshelf deleted',
      description: `Bookshelf "${selectedBookshelf}" has been deleted.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setSelectedBookshelf('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Bookshelf</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder="Select bookshelf"
            value={selectedBookshelf}
            onChange={(e) => setSelectedBookshelf(e.target.value)}
          >
            {bookshelves.map((shelf) => (
              <option key={shelf.name} value={shelf.name}>
                {shelf.name}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBookshelfModal;
