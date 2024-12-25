import {
  Text,
  useColorModeValue,
  Box
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableRender from 'components/tableRender/TableRender';
import TableHeader from 'components/tableRender/TableHeader';
import ShowVideoModal from 'components/modal/ShowVideoModal';
import NotificationModal from 'components/modal/NotificationModal';
import AddOrEditExerciseModal from 'components/modal/AddOrEditExerciseModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import TableColumnExercise from 'components/tableRender/TableColumnExercise';
import Pagination from 'components/pagination/Paginantion';

export default function ExerciseTable() {
  const [data, setData] = useState([]);
  const [totalExercises, setTotalExercises] = useState(0);
  const [userId, setUserId] = useState(0) 
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoPath, setCurrentVideoPath] = useState('');
  const [dataSelectedRow, setDataSelectedRow] = useState({})
  const [currentExercise, setCurrentExercise] = useState({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [isButtonAddClick, setIsButtonAddClick] = useState(false);
  const [isButtonEditClick, setIsButtonEditClick] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: null,
    description: null,
    videoPath: null,
    imagePath: null,
    userId: 0,
    met: 0
  });
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const pageSize = 10;
  const totalPages = Math.ceil(totalExercises / pageSize);
  const accessToken = localStorage.getItem('accessToken'); 

  const handleEditExercise = (exercise) => {
    setCurrentExercise(exercise);
    setIsOpen(true)
    setIsButtonEditClick(true)
  };

  const handleDeleteExercise = (rowData) => {
    setIsModalDeleteOpen(true)
    setSelectedExerciseId(rowData.id)
  }

  const handleOpenVideoModal = (dataSelected) => {
    setDataSelectedRow(dataSelected)
    setCurrentVideoPath(dataSelected.publicVideoUrl)
    setIsVideoModalOpen(true)
  }

  const handleOpenModalAddExercise = () => {
    setIsButtonAddClick(true);
    setIsOpen(true);
  };

  const handleCloseModalExercise = () => {
    setIsOpen(false);
    setIsButtonEditClick(false);
    setIsButtonAddClick(false);
    setNewExercise({ 
      name: null, 
      description: null, 
      videoPath: null, 
      imagePath: null, 
      userId: 0 
    });
  }

  const handleInputPageChange = (event) => { 
    setTimeout(() => {
      const value = event.target.value;
      const pageNumber = Number(value) - 1;

      if (pageNumber >= 0 && pageNumber < totalPages) {
        setCurrentPage(pageNumber);
      } else if (value === "") {
        setCurrentPage(0);
      }
    }, 1500);
  };
  
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/exercises/${selectedExerciseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setData((prev) => prev.filter((exercise) => exercise.id !== selectedExerciseId));
      setIsSuccess(true);
      setNotificationMessage("The exercise has been deleted successfully.");
    }
    catch (error) {
      console.error('Error deleting exercise:', error);
      setIsSuccess(false);
      setNotificationMessage("There was an error deleting the exercise.");
    }
    finally {
      setIsNotificationOpen(true);
      setIsOpen(false);
      setIsModalDeleteOpen(false)
    }
  };

  const handleUpdateExercise = async () => {
    const updateExercise = {
      name: currentExercise.name,
      description: currentExercise.description,
      imagePath: null,
      videoPath: null,
      userId: currentExercise.userId,
      met: 0
    }
    try {
      await axios.put(`/api/exercises/${currentExercise.id}`, updateExercise, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      })

      const { data: getExerciseUpdated } = await axios.get(`/public/api/exercises/${currentExercise.id}`)
    
      setData((prev) => prev.map((exercise) => (exercise.id === currentExercise.id ? getExerciseUpdated : exercise)));
      setCurrentExercise({});
      setIsSuccess(true);
      setNotificationMessage("The exercise has been updated successfully.");
    } 
    catch (error) {
      console.error('Error updating exercise:', error);
      setIsSuccess(false);
      setNotificationMessage("There was an error updating the exercise.");
    } 
    finally {
      setIsNotificationOpen(true);
      setIsOpen(false);
    }
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: exerciseData }, { data: userData }, { data: allExerciseData }] = await Promise.all([
          axios.get(`/public/api/exercises?page=${currentPage}&size=${pageSize}`),
          axios.get(`/api/account`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }),
          axios.get('/public/api/exercises/all')
        ])

        setData(exerciseData);
        setUserId(userData.id)
        setTotalExercises(allExerciseData.length)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, accessToken]);

  const handleAddExercise = async () => {
    try {
      const addExercise = await axios.post('/api/exercises', 
        { ...newExercise, imagePath: null, videoPath: null, userId: userId }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}` 
          }
        }
      );

      const formDataImage = new FormData()
      formDataImage.append('image', newExercise.imagePath)
      await axios.put(`/api/exercises/${addExercise.data.id}/upload-image`, formDataImage, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      const formDataVideo = new FormData()
      formDataVideo.append('video', newExercise.videoPath)
      await axios.put(`/api/exercises/${addExercise.data.id}/upload-video`, formDataVideo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setData((prev) => [...prev, addExercise.data])
      setIsSuccess(true)
      setNotificationMessage('The exercise has been added successfully.')
    } 
    catch (err) {
      console.log("Error adding exercise", err);
      setIsSuccess(false);
      setNotificationMessage("There was an error adding the exercise.");
    } 
    finally {
      setIsNotificationOpen(true);
      setIsOpen(false);
    }
  };

  const columns = TableColumnExercise(textColor, handleEditExercise, handleDeleteExercise, handleOpenVideoModal);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
        <TableHeader
          title="Add Exercise"
          onOpenAdd={handleOpenModalAddExercise}
        />
        
        <AddOrEditExerciseModal
          isOpen={isOpen}
          onClose={handleCloseModalExercise}
          isButtonAddClick={isButtonAddClick}
          isButtonEditClick={isButtonEditClick}
          newExercise={newExercise}
          setNewExercise={setNewExercise}
          currentExercise={currentExercise}
          setCurrentExercise={setCurrentExercise}
          handleAddExercise={handleAddExercise}
          handleUpdateExercise={handleUpdateExercise}
        />

        <TableRender
          data={data}
          columns={columns}
          onRowClick={null}
          borderColor={borderColor}
          hover={false}
        />

        <ShowVideoModal
          type='exercise'
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          currentVideoPath={currentVideoPath}
          dataSelectedRow={dataSelectedRow}
        />

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          handleInputPageChange={handleInputPageChange}
        />

        <DeleteConfirmationModal
          isOpen={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
          handleConfirmDelete={handleConfirmDelete}
          object='Exercise'
        />

        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          message={notificationMessage}
          isSuccess={isSuccess}
        />
      </Card>
    </Box>
  );
}
