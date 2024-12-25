import React from 'react';
import { Flex, Button, Text, Input } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, setCurrentPage, handleInputPageChange }) => {
  return (
    <Flex justifyContent="space-between" mt="20px">
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        isDisabled={currentPage === 0}
      >
        Previous
      </Button>
      
      <Flex alignItems='center' justifyContent="space-between" width='12%'>
        <Text>Page</Text>
        <Input
          type='number'
          placeholder={currentPage + 1}
          min={1}
          max={totalPages}
          onChange={handleInputPageChange}
          width="3rem"
          textAlign="center"
          mb='20px'
        />
        <Text>
          of {totalPages}
        </Text>
      </Flex>
      
      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
        isDisabled={currentPage >= totalPages - 1}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;