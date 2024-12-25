import React from "react";
import {
  Button,
  Flex,
} from "@chakra-ui/react";

export default function BannerWorkout({ onOpenAddWorkout }) {
  return (
    <Flex justifyContent="flex-end" p="4">
      <Button onClick={onOpenAddWorkout} colorScheme="blue">
        Add Workout 
      </Button>
    </Flex>
  );
}
