import React from 'react';
import { Button, Center, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <List display="flex" justifyContent="space-evenly">
      <ListItem mx={2}>
        <IconButton
          variant="secondary"
          isRound
          icon={<FiArrowLeft />}
          aria-label="Previous Page"
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
        />
      </ListItem>

      <List display={{ base: 'none', md: 'flex' }} gap="1">
        {[...Array(totalPages)].map((_, index) => (
          <ListItem key={index}>
            <Button
              variant="secondary"
              borderRadius="full"
              _selected={{ bg: 'gray.50', _dark: { bg: 'gray.800' } }}
              onClick={() => handlePageChange(index + 1)}
              isActive={index + 1 === currentPage}
            >
              {index + 1}
            </Button>
          </ListItem>
        ))}
      </List>

      <ListItem as={Center} display={{ md: 'none' }}>
        <Text fontWeight="medium" color="fg.emphasized">
          Page {currentPage} of {totalPages}
        </Text>
      </ListItem>

      <ListItem mx={2}>
        <IconButton
          variant="secondary"
          isRound
          icon={<FiArrowRight />}
          aria-label="Next Page"
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
        />
      </ListItem>
    </List>
  );
};
