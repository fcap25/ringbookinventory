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
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useBookshelf } from '../contexts/BookshelfContext';

interface EditBookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditBookshelfModal: React.FC<EditBookshelfModalProps> = ({ isOpen, onClose }) => {
  const { bookshelves, editBookshelf } = useBookshelf();
  const [selectedBookshelf, setSelectedBookshelf] = useState('');
  const [newName, setNewName] = useState('');
  const toast = useToast();

  const handleEdit = () => {
    if (selectedBookshelf === '' || newName.trim() === '') {
      toast({
        title: 'Invalid input',
        description: 'Please select a bookshelf and provide a new name.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    editBookshelf(selectedBookshelf, newName);
    toast({
      title: 'Bookshelf edited',
      description: `Bookshelf "${selectedBookshelf}" has been renamed to "${newName}".`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setSelectedBookshelf('');
    setNewName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bookshelf</ModalHeader>
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
          <Input
            placeholder="New bookshelf name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            mt={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleEdit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBookshelfModal;
