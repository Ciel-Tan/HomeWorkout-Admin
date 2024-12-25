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

const AddOrEditPlanModal = ({ isOpen, onClose, isButtonAddClick, isButtonEditClick, newPlan, setNewPlan, currentPlan, setCurrentPlan, handleAddPlan, handleUpdatePlan }) => {
  const inputLabel = ['name', 'description'];

  const isFormValid = inputLabel.every((field) => 
    isButtonAddClick ? newPlan[field]?.trim() : currentPlan[field]?.trim()
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isButtonAddClick ? 'Add New Plan' : isButtonEditClick && 'Update Plan'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {inputLabel.map((field, index) => (
            <FormControl mb="4" key={index} isRequired>
              <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
              <Input
                type="text"
                value={
                  isButtonAddClick
                    ? newPlan[field]
                    : isButtonEditClick
                    ? currentPlan[field]
                    : ''
                }
                onChange={(e) => {
                  const value = e.target.value;
                  isButtonAddClick
                    ? setNewPlan({ ...newPlan, [field]: value })
                    : isButtonEditClick &&
                      setCurrentPlan({ ...currentPlan, [field]: value });
                }}
                placeholder={`Plan ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              />
            </FormControl>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={isButtonAddClick ? handleAddPlan : handleUpdatePlan}
            disabled={!isFormValid}
          >
            {isButtonAddClick ? 'Add Plan' : 'Update Plan'}
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOrEditPlanModal;