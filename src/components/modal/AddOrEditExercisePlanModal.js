import React, { useEffect, useRef, useState } from 'react';
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
import { DragHandleIcon } from '@chakra-ui/icons';
import AddExerciseModal from './AddExerciseModal';
import axios from 'axios';

const AddOrEditExercisePlanModal = ({
    isOpen,
    onClose,
    isButtonAddClick,
    isButtonEditClick,
    newExercisePlan,
    setNewExercisePlan,
    currentExercisePlan,
    setCurrentExercisePlan,
    handleAddExercisePlan,
    handleUpdateExercisePlan,
}) => {
    const [exerciseModal, setExerciseModal] = useState({
        isOpenExerciseModal: false,
        exercises: {}
    })

    useEffect(() => {
        const getAllExercise = async () => {
            try {
                const { data: exerciseData } = await axios.get(`/public/api/exercises/all`)

                setExerciseModal({ ...exerciseModal, exercises: exerciseData })
            }
            catch (err) {
                console.log('That was an error to get all exercise data')
            }
        }

        getAllExercise()
    }, [isButtonAddClick])

    const handleCloseAddExerciseModal = () => {
        setExerciseModal({ ...exerciseModal, isOpenExerciseModal: false })
    }

    const handleOpenAddExerciseModal = () => {
        setExerciseModal({ ...exerciseModal, isOpenExerciseModal: true })
    }

    const handleClickButtonAdd = (exercise) => {
        handleCloseAddExerciseModal()

        setNewExercisePlan((prev) => ({
            ...prev,
            exerciseId: exercise.id,
            exercise: {
                ...exercise
            }
        }))
    }

    const handleInputChange = (field, value) => {
        isButtonAddClick 
            ? setNewExercisePlan((prev) => ({ ...prev, [field]: value }))
            : setCurrentExercisePlan((prev) => ({ ...prev, [field]: value }))
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{isButtonAddClick ? 'Add New Exercise' : 'Update Exercise'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isButtonAddClick &&
                        <FormControl mb="4" isRequired>
                            <FormLabel>Select exercise</FormLabel>
                            <Input
                                value={newExercisePlan.exercise?.name || ''}
                                placeholder="Select exercise"
                                readOnly
                                w='90%'
                            />
                            <DragHandleIcon
                                boxSize={5}
                                color="gray.500"
                                ml='1rem'
                                cursor="pointer"
                                onClick={handleOpenAddExerciseModal}
                            />
                        </FormControl>
                    }
                    <FormControl mb="4" isRequired>
                        <FormLabel>Set count</FormLabel>
                        <Input
                            type='number'
                            value={isButtonAddClick ? newExercisePlan.setCount : currentExercisePlan.setCount}
                            onChange={(e) => handleInputChange('setCount', e.target.value)}
                            placeholder="0"
                        />
                    </FormControl>
                    <FormControl mb="4" isRequired>
                        <FormLabel>Rep count</FormLabel>
                        <Input
                            type='number'
                            value={isButtonAddClick ? newExercisePlan.repCount : currentExercisePlan.repCount}
                            onChange={(e) => handleInputChange('repCount', e.target.value)}
                            placeholder="0"
                        />
                    </FormControl>
                    <FormControl mb="4" isRequired>
                        <FormLabel>Rest time</FormLabel>
                        <Input
                            type='number'
                            value={isButtonAddClick ? newExercisePlan.restTime : currentExercisePlan.restTime}
                            onChange={(e) => handleInputChange('restTime', e.target.value)}
                            placeholder="0"
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={isButtonAddClick ? handleAddExercisePlan : handleUpdateExercisePlan}>
                        {isButtonAddClick ? 'Add Exercise' : 'Update Exercise'}
                    </Button>
                    <Button onClick={onClose} ml={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>

            <AddExerciseModal
                { ...exerciseModal }
                handleClickButtonAdd={handleClickButtonAdd}
                onClose={handleCloseAddExerciseModal}
            />
        </Modal>
    );
};

export default AddOrEditExercisePlanModal;