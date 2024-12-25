import React from "react";
import { Button, Flex } from "@chakra-ui/react";

export default function Banner({ type, onOpenAdd }) {
  return (
    <Flex justifyContent="flex-end" p="4">
      <Button onClick={ onOpenAdd } colorScheme="green">
        {type === 'Plan Table' ? 'Add Plan' : type === 'Exercise Table' ? 'Add New Day' : 'Add Exercise'}
      </Button>
    </Flex>
  );
}
