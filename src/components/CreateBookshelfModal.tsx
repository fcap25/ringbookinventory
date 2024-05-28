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
  useToast,
} from '@chakra-ui/react';
import { useBookshelf } from '../contexts/BookshelfContext';

interface CreateBookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBookshelfModal: React.FC<CreateBookshelfModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const { addBookshelf } = useBookshelf();
  const toast = useToast();

  const handleCreate = () => {
    if (name.trim() === '') {
      toast({
        title: 'Invalid name',
        description: 'Bookshelf name cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    addBookshelf(name);
    toast({
      title: 'Bookshelf created',
      description: `Bookshelf "${name}" has been created.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Bookshelf</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Bookshelf name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateBookshelfModal;
