// UserTableColumns.js
import { Text, Button, Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const UserTableColumns = (handleDelete) => [
  columnHelper.accessor('username', {
    header: () => <Text color="gray.400">Username</Text>,
    cell: (info) => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('email', {
    header: () => <Text color="gray.400">Email</Text>,
    cell: (info) => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('firstName', {
    header: () => <Text color="gray.400">First Name</Text>,
    cell: (info) => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('lastName', {
    header: () => <Text color="gray.400">Last Name</Text>,
    cell: (info) => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.accessor('age', {
    header: () => <Text color="gray.400">Age</Text>,
    cell: (info) => <Text>{info.getValue()}</Text>,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <Text color="gray.400">Actions</Text>,
    cell: (info) => (
      <Flex>
        <Button onClick={() => handleDelete(info.row.original.id)} colorScheme="red" size="sm">
          Delete
        </Button>
      </Flex>
    ),
  }),
];

export default UserTableColumns;