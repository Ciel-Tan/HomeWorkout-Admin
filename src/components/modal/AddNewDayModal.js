import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const AddNewDayModal = ({ isOpen, onClose, newDatePlan, setNewDatePlan, handleAddDatePlan }) => {
  const inputLabel = ['dateOrder', 'time'];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Day</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {inputLabel.map((field, index) => (
            <FormControl mb="4" key={index} isRequired>
              <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                <Input
                  type={field === 'dateOrder' ? 'text' : 'time'}
                  onChange={(e) => {
                    setNewDatePlan({ ...newDatePlan, [field]: e.target.value });
                  }}
                  placeholder={field === 'dateOrder' && '0'}
                />
            </FormControl>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAddDatePlan}>
            Add new day
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewDayModal;