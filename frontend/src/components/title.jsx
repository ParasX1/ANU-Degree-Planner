import React from 'react';
import { Box, Text, Flex, IconButton, Tooltip, Divider } from '@chakra-ui/react';
import { FaSearch, FaBookmark } from 'react-icons/fa'; // Import the search and bookmark icons

function Title() {
  return (
    <>
      <Flex
        width="100%"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        paddingLeft="70px"
        paddingRight="10%" // Adjust right padding for spacing
        paddingTop="20px"
      >
        <Box>
          <Text
            className='karla'
            fontSize={['md', 'lg', '2xl']} // Responsive font size, smaller on smaller screens
            fontWeight="medium"
            fontStyle="italic"
          >
            John's Degree Plan
          </Text>
          <Text
            className='karla'
            fontSize={['xl', '2xl', '3xl']} // Responsive font size
            fontWeight="bold"
            color="#BB8B00"
          >
            Bachelor of Advanced Computing
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Tooltip label="Search">
            <IconButton
              aria-label="Search"
              icon={<FaSearch color="white" />}
              borderRadius="50%"
              bg="black"
              marginLeft="10px" // Adjust left margin for spacing
            />
          </Tooltip>
          <Tooltip label="Bookmark">
            <IconButton
              aria-label="Bookmark"
              icon={<FaBookmark color="white" />}
              borderRadius="50%"
              bg="black"
              marginLeft="10px" // Adjust left margin for spacing
            />
          </Tooltip>
        </Box>
      </Flex>
      <Divider
        mt="10px"
        ml="70px" // Add left margin for padding
        borderWidth="0.4pt"
        borderColor="#BB8B00"
        width="90%" // Adjust the width of the line
      />
    </>
  );
}

export default Title;
