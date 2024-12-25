// Chakra imports
import {
  Grid,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Checkbox,
  background,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdDelete } from "react-icons/md";
import defaultAvatar from "assets/img/profile/default avatar.jpg";

export default function Project(props) {
  const { number, avatar, username, email, firstName, lastName, age, level, Active, onClick, onDeleteClick } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.200";
  // const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card
      onClick={onClick}
      bg={bg} 
      mb='20px' 
      boxShadow={cardShadow} 
      p='14px' 
      _hover={{ bg: textColorSecondary, transform: "scale(1.02)" }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <Flex align='center' direction={{ base: "column", md: "row" }}>
        <Text w="30px" mb='4px' mr="14px" textAlign="center">{number}</Text>
        <Image h='50px' w='50px' src={avatar ? avatar : defaultAvatar} borderRadius='50%' me='13px' />
        <Grid
          templateColumns="15% 30% 12% 13% 10% 12% 8%"
          gap="0"
          mt={{ base: "10px", md: "0" }}
          width="100%"
          alignItems='center'
        > 
          <Text
            color={textColorPrimary} 
            fontWeight='500'
            fontSize='md'
            mb='4px'
          >
            {username}
          </Text>

          <Text
            color={textColorPrimary} 
            fontWeight='500'
            fontSize='md'
            mb='4px'
          >
            {email}
          </Text>

          <Text
            color={textColorPrimary} 
            fontWeight='500'
            fontSize='md'
            mb='4px'
          >
            {firstName}
          </Text>

          <Text
            color={textColorPrimary} 
            fontWeight='500'
            fontSize='md'
            mb='4px'
          >
            {lastName}
          </Text>

          <Text
            color={textColorPrimary} 
            fontWeight='500'
            fontSize='md'
            mb='4px'
            textAlign="center"
          >
            {age}
          </Text>

          <Text
            color={textColorPrimary} 
            fontWeight='500'
            fontSize='md'
            mb='4px'
            textAlign="center"
          >
            {level}
          </Text>

          <Flex justify="center" mb="4px" mt="5px" pt="5px" >
            <Checkbox isChecked={Active} isDisabled/>
          </Flex>
        </Grid>
        <Link
          variant='no-hover'
          me='16px'
          ms='auto'
          p='0px !important'
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick of the card
            onDeleteClick();
          }}
        >
          <Icon as={MdDelete} color='secondaryGray.500' h='25px' w='25px' mb='4px'/>
        </Link>
      </Flex>
    </Card>
  );
}
