import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

const AddExerciseModal = ({ isOpenExerciseModal, exercises, handleClickButtonAdd, onClose }) => {
    const [exerciseData, setExerciseData] = useState(exercises)
    const handleChangeSearchInput = (value) => {
        setExerciseData(exercises.filter((exercise) => exercise.name.toLowerCase().includes(value.toLowerCase())))
    }
    return (
        <Modal isOpen={isOpenExerciseModal} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select exercise</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    maxHeight="500px" 
                    overflowY="auto"
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '8px', // Set the width of the scrollbar
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'gray.300', // Color of the scrollbar thumb
                            borderRadius: '4px', // Rounded corners
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent', // Background of the scrollbar track
                        },
                        scrollbarWidth: 'thin', // For Firefox
                        scrollbarColor: 'gray.300 transparent', // For Firefox
                    }}
                >
                    <Flex justifyContent='end'>
                        <SearchBar
                            handleChangeSearchInput={handleChangeSearchInput}
                        />
                    </Flex>
                    {exerciseData.map((exercise) => (
                        <Flex 
                            key={exercise.id}
                            h='4rem'
                            justifyContent='space-between'
                            marginY='1rem'
                            paddingX='.5rem'
                            _hover={{bg: "gray.200"}}
                            cursor='pointer'
                            borderRadius='.5rem'
                        >
                            <Image h='50px' w='50px' alignSelf='center' src={exercise.publicImageUrl}/>
                            <Text w='65%' margin='0 auto' alignSelf='center'>{exercise.name}</Text>

                            <Button
                                background='#27ce91' 
                                _hover={{bg: '#2f845a'}} 
                                alignSelf='center'
                                onClick={() => handleClickButtonAdd(exercise)}
                            >
                                Add
                            </Button>
                        </Flex>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddExerciseModal;