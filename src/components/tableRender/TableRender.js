import React, { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from '@chakra-ui/react';
import { flexRender, useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';

const TableRender = ({ data, columns, onRowClick, borderColor, hover }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box>
      {data.length === 0 
        ? <Text fontSize='1.5rem' fontWeight={'bold'} textAlign={'center'}>No exercise</Text> 
        : 
      <Table variant="simple" color="gray.500" mb="24px" mt="12px">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  pe="10px"
                  borderColor={borderColor}
                  cursor="pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <Flex justifyContent="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: '🔼',
                      desc: '🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.slice(0, 25).map((row) => (
            <Tr
              key={row.id}
              {...(hover && {
                _hover: { bg: 'gray.200', transform: "scale(1.02)" },
                transition: "all 0.2s",
                cursor: 'pointer',
                onClick: () => onRowClick(row.original),
              })}
            >
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} borderColor={borderColor}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      }
    </Box>
  );
};

export default TableRender;