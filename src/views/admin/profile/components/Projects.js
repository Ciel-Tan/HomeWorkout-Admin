import React, { useEffect, useState } from "react";
import {
  Text,
  useColorModeValue,
  Button,
  Spinner,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card.js";
import Project from "views/admin/profile/components/Project";
// import Project1 from "assets/img/profile/Project1.png"
import Banner from "views/admin/profile/components/Banner";
import banner from "assets/img/auth/banner.png";
import Pagination from "components/pagination/Paginantion";
import DeleteConfirmationModal from "components/modal/DeleteConfirmationModal";
import TableHeader from "components/tableRender/TableHeader";
import TableRender from "components/tableRender/TableRender";
import UserTableColumns from "components/tableRender/TableColumnProfileUser";

export default function Projects() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const [userData, setUserData] = useState([]);
  const [userAttribute, setUserAttribute] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday)
    const currentDate = new Date()
    const monthDifference = currentDate.getMonth() - birthDate.getMonth()
    const dayDifference = currentDate.getDate() - birthDate.getDate()

    let age = currentDate.getFullYear() - birthDate.getFullYear()

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0))
    {
        age--
    }

    return age
  }

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const allUser = await axios.get(`/public/api/users/all`)

        const userData = await axios.get(`/public/api/users?id.greaterThan=1050&page=${currentPage}&size=${pageSize}`);
        setUserData(userData.data);
        setTotalUsers(allUser.data.length);
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [currentPage, pageSize]);

  const fetchUserAttribute = async (userId) => {
    try {
      const userAttribute = await axios.get(`/api/user-attributes/all?userId.equals=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setUserAttribute(userAttribute.data)
    }
    catch (err) {
      console.error("Error fetching user attribute", err);
      setError("Error fetching user attribute");
    }
  }

  const handleUserClick = (user) => {
    setSelectedProject(user);
    setIsModalOpen(true);

    fetchUserAttribute(user.id)
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setIsModalDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      // Refresh the user data after deletion
      setUserData(userData.filter(user => user.id !== selectedUserId));
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error deleting user", err);
      setError("Error deleting user");
    }
  };

  const handleInputPageChange = (event) => { 
    setTimeout(() => {
      const value = event.target.value;
      const pageNumber = Number(value) - 1;

      if (pageNumber >= 0 && pageNumber < totalPages) {
        setCurrentPage(pageNumber);
      } else if (value === "") {
        setCurrentPage(0);
      }
    }, 1500)
  }

  // const columns = UserTableColumns(handleDeleteClick); // Pass the handleDelete function to the columns

  const totalPages = Math.ceil(totalUsers / pageSize);

  if (loading) return <Spinner color="blue.500" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <TableHeader title="All User Table" />
      <Grid
        templateColumns="4% 6.5% 12.5% 25.5% 10% 11% 8.6% 10.2% 7%"
        gap="0"
        mt={{ base: "10px", md: "0" }}
        width="100%"
        alignItems='center'
      >
        <Text textAlign="center">#</Text>
        <Text textAlign="center">Ava</Text>
        <Text>Username</Text>
        <Text>Email</Text>
        <Text>First name</Text>
        <Text>Last name</Text>
        <Text textAlign="center">Age</Text>
        <Text textAlign="center">Level</Text>
        <Text textAlign="center">Active</Text>
      </Grid>
      {userData.map((user, index) => (
        <Project
          key={user.id}
          number={currentPage * pageSize + index + 1}
          avatar={user.publicAvatarUrl}
          username={user.username}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          age={calculateAge(user.birthday).toString()}
          level={user.level}
          Active={user.isActivated}
          onClick={() => handleUserClick(user)}
          onDeleteClick={() => handleDeleteClick(user.id)}
        />
      ))}

      {/* <TableRender data={userData} columns={columns} /> */}

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        handleInputPageChange={handleInputPageChange}
      />

      {/* Modal for project details */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
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
            {selectedProject && (
              <Banner
                banner={banner}
                avatar={selectedProject.publicAvatarUrl}
                username={selectedProject.username}
                fullName={`${selectedProject.firstName} ${selectedProject.lastName}`}
                userAttribute={userAttribute}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        handleConfirmDelete={handleConfirmDelete}
        object='User'
      />
    </Card>
  );
}