import { Text, Flex, IconButton, Box, Image } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const TableColumn = (type, textColor, handleEdit, handleDelete, handleOpenModalApprovePlanOrNot, handleOpenVideoModal) => {
  const columns = [];

  if (type === 'exercise') {
    columns.push(
      columnHelper.accessor('exercise.publicImageUrl', {
        id: 'publicImageUrl',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            IMAGE
          </Text>
        ),
        cell: (info) => (
          <Image h='50px' w='50px' src={info.getValue()} borderRadius='10%' me='13px' />
        ),
        size: 15
      })
    );
  }

  columns.push(
    columnHelper.accessor(type === 'plan' || type === 'approve' ? 'name' : 'exercise.name', {
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
      size: 15
    }),
    columnHelper.accessor(type === 'plan' || type === 'approve' ? 'description' : 'exercise.description', {
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
      size: 40
    })
  );

  if (type === 'plan' || type === 'approve') {
    columns.push(
      columnHelper.accessor('totalDays', {
        id: 'totalDays',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            TOTAL DAYS
          </Text>
        ),
        cell: (info) => (
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor('rating', {
        id: 'rating',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            RATING
          </Text>
        ),
        cell: (info) => (
          <Flex align="center">
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()} ⭐
            </Text>
          </Flex>
        ),
      }),
      // columnHelper.accessor('status', {
      //   id: 'status',
      //   header: () => (
      //     <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
      //       STATUS
      //     </Text>
      //   ),
      //   cell: (info) => (
      //     <Flex align="center">
      //       <Text color={textColor} fontSize="sm" fontWeight="700">
      //         {info.getValue()}
      //       </Text>
      //     </Flex>
      //   ),
      // })
    );
  } else if (type === 'exercise' || type === 'approveExercise') {
    columns.push(
      columnHelper.accessor('exercise.publicVideoUrl', {
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
        size: 15
      })
    );
  }

  if (type === 'plan' || type === 'exercise') {
    columns.push(
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
              aria-label={`Edit ${type}`}
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(info.row.original);
              }}
              mr={2}
            />
            <IconButton
              aria-label={`Delete ${type}`}
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(info.row.original);
              }}
            />
          </Flex>
        ),
        size: 15
      })
    );
  }
  else if (type === 'approve') {
    columns.push(
      columnHelper.display({
        id: 'check',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            ACTION
          </Text>
        ),
        cell: (info) => (
          <Flex>
            <IconButton
              aria-label={`Edit ${type}`}
              icon={<CheckIcon />}
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModalApprovePlanOrNot(info.row.original, true);
              }}
              mr={2}
            />
            <IconButton
              aria-label={`Delete ${type}`}
              icon={<CloseIcon />}
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModalApprovePlanOrNot(info.row.original, false);
              }}
            />
          </Flex>
        ),
        size: 15
      })
    );
  }

  return columns;
};

export default TableColumn;