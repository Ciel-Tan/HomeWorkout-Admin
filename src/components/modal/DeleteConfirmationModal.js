import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const DeleteConfirmationModal = ({ isOpen, onClose, handleConfirmDelete, object }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure wanna delete this {object}?
        </ModalBody>
        <ModalFooter pr=".5rem">
          <Button colorScheme="red" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
          <Button variant="ghost" border="1px solid #333" ml='.5rem' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;