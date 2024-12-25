import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Banner from 'components/menu/Banner';

const TableHeader = ({ title, onOpenAdd }) => {
  return (
    <Flex px="25px" mb="8px" mt='1rem' justifyContent="space-between" align="center">
      <Text color="gray.800" fontSize="22px" fontWeight="700" lineHeight="100%">
        {title}
      </Text>
      {(title === 'Plan Table' || title === 'Exercise Table' || title === 'Add Exercise') && 
        <Banner type={title} onOpenAdd={onOpenAdd}/>
      }
    </Flex>
  );
};

export default TableHeader;