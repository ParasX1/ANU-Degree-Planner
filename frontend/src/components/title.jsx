import React from 'react';
import { Box, Text, Flex, IconButton, Tooltip, Divider } from '@chakra-ui/react';
import { FaCheck, FaBookmark } from 'react-icons/fa'; // Import the search and bookmark icons

function Title({onSave, isPDFMode, onValidate}) { // Adding onSave prop
  return (
    <>
      <Flex
        width="100%"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        paddingLeft="70px"
        paddingRight="8%" // Adjust right padding for spacing
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


        <Flex>
          <Flex flexDirection="column" alignItems="center" ml="10px" mt="20px">
            {!isPDFMode && ( // Conditional rendering for the Search icon
            <>
            <Tooltip label="Validate">
              <IconButton
                aria-label="Validate"
                icon={<FaCheck color="white" />}
                borderRadius="50%"
                bg="black"
                onClick = {onValidate} // Calls the onValidate function when the validate button is pressed.
              />
            </Tooltip>
            <Text mt="1" color="black" fontSize="xs">Validate</Text>
            </>
          )}
        </Flex>

        <Flex flexDirection="column" alignItems="center" ml="10px" mt="20px">
          {!isPDFMode && ( // Conditional rendering for the Save icon
            <>
            <Tooltip label="Save">
              <IconButton
                aria-label="Save"
                icon={<FaBookmark color="white" />}
                borderRadius="50%"
                bg="black"
                onClick = {onSave} // calling onSave function when the save button is clicked
              />
            </Tooltip>
            <Text mt="1" color="black" fontSize="xs">Save</Text>
            </>
          )}
          </Flex>
        </Flex>
      </Flex>

      <Divider
        mt="20px"
        borderWidth="0.4pt"
        borderColor="#BB8B00"
      />
    </>
  );
}

export default Title;

