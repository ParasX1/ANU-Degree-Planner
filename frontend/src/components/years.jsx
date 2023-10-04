// This is the Year component. It is responsible for rendering the year text in the Degree Planner application.
// It uses the Text component from the Chakra UI library and applies specific styles to it.
import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';

function Year({ text, onDelete }) {
  return (
   <Flex alignItems="center" pt="5" pl="70px">
    <Text
      className='karla'
      fontFamily="Karla, sans-serif"
      fontWeight="bold"
      fontStyle="italic"
      fontSize="xl" // Adjust font size as needed
      pt="5"
//       pl="70px"   // Add 60px of padding on the left
    >
      {text}
    </Text>
    <DeleteIcon cursor="pointer" onClick={onDelete} ml="10px"/>
   </Flex>
  );
}

export default Year;
