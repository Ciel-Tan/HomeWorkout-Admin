// UserTableColumns.js
import { Text, Flex, IconButton, Box, Image } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const columnHelper = createColumnHelper();

const TableColumnExercise = (textColor, handleEdit, handleDelete, handleOpenVideoModal) => [
    columnHelper.accessor('publicImageUrl', {
        id: 'publicImageUrl',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            IMAGE
          </Text>
        ),
        cell: (info) => (
          <Image h='50px' w='50px' src={info.getValue()} borderRadius='10%' me='13px' />
        ),
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
          NAME
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('description', {
        id: 'description',
        header: () => (
        <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            DESCRIPTION
        </Text>
        ),
        cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
        </Text>
        ),
    }),
    columnHelper.accessor('publicVideoUrl', {
        id: 'publicVideoUrl',
        header: () => (
        <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            VIDEO
        </Text>
        ),
        cell: (info) => (
        <Box>
            <Text
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            _hover={{ color: 'blue' }}
            cursor='pointer'
            onClick={() => handleOpenVideoModal(info.row.original)}
            >
            View Video
            </Text>
        </Box>
        ),
    }),
    columnHelper.display({
      id: 'delete',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
          ACTION
        </Text>
      ),
      cell: (info) => (
        <Flex>
          <IconButton
            aria-label={`Edit`}
            icon={<EditIcon />}
            colorScheme="blue"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(info.row.original);
            }}
            mr={2}
          />
          <IconButton
            aria-label={`Delete`}
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(info.row.original);
            }}
          />
        </Flex>
      ),
    })
];

export default TableColumnExercise;