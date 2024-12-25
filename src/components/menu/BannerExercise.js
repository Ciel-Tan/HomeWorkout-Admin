import React from "react";
import { Button, Flex } from "@chakra-ui/react";

export default function BannerExercise({ onOpenAddExercise }) {
  return (
    <Flex justifyContent="flex-end" p="4">
      <Button onClick={onOpenAddExercise} colorScheme="green">
        Add Exercise
      </Button>
    </Flex>
  );
}
