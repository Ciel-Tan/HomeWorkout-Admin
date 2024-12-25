// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import defaultAvatar from "assets/img/profile/default avatar.jpg";

export default function Banner(props) {
  const { banner, avatar, username, fullName, userAttribute } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const textWhite = "white"
  const brightGreen = "#62f700"
  const brightRed = "#f72300"
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={avatar ? avatar : defaultAvatar}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {username}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {fullName}
      </Text>
      <Flex w='100%' direction='column' mt="20px">
        {userAttribute.map(attr => (
          <Flex 
            key={attr.id} 
            w="100%" 
            direction='row'
            bg={attr.isFocus ? brightGreen : brightRed}
            borderRadius="10px"
            mb="20px"
          >
            <Flex w="45%" align='center' direction="row">
              <Text color={textWhite} w="50%" h="50%" m="0 auto" pl="10px" fontSize='sm' fontWeight='400' textAlign="left">
                {attr.attribute.name}:
              </Text>
              <Text color={textWhite} w="30%" h="100%" m="0 auto" fontSize='2xl' fontWeight='700'  textAlign="right">
                {attr.measure}
              </Text>
              <Text color={textWhite} w="20%" h="50%" m="0 5px" fontSize='sm' fontWeight='400' textAlign="left">
                {attr.unit}
              </Text>
            </Flex>

            <Flex w="55%" align='center'>
              <Text color={textWhite} w="55%" h="50%" m="0 auto" pl="15px" fontSize='sm' fontWeight='400' textAlign="left">
                Measure goal:
              </Text>
              
              <Text color={textWhite} w="28%" h="100%" m="0 auto" fontSize='2xl' fontWeight='700' textAlign="right">
                {attr.measureGoal}
              </Text>

              <Text color={textWhite} w="15%" h="50%" m="0 5px" fontSize='sm' fontWeight='400' textAlign="left">
                {attr.unit}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
