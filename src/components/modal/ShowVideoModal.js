import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';

const ShowVideoModal = ({ type, isOpen, onClose, currentVideoPath, dataSelectedRow }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Video</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <video width="100%" controls>
              <source src={currentVideoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {type === 'exercise plan' &&
              <Flex mt='3rem'>
                <Flex w='50%' flexDirection='column' alignItems='center'>
                  <Text fontSize='2xl' fontWeight='700'>{dataSelectedRow.setCount}</Text>
                  <Text fontSize='sm'>{dataSelectedRow.setCount >= 2 ? 'Sets' : 'Set'}</Text>
                </Flex>
                
                <Flex w='50%' flexDirection='column' alignItems='center'>
                  <Text fontSize='2xl' fontWeight='700'>{dataSelectedRow.repCount}</Text>
                  <Text fontSize='sm'>{dataSelectedRow.repCount >= 2 ? 'Reps' : 'Rep'}</Text>
                </Flex>

                <Flex w='50%' flexDirection='column' alignItems='center'>
                  <Text fontSize='2xl' fontWeight='700'>{dataSelectedRow.restTime}</Text>
                  <Text fontSize='sm'>Rests</Text>
                </Flex>
              </Flex>
            }
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShowVideoModal;