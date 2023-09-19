// This is the Year component. It is responsible for rendering the year text in the Degree Planner application.
// It uses the Text component from the Chakra UI library and applies specific styles to it.
import React from "react";
import { Text } from "@chakra-ui/react";

function Year({ text }) {
  return (
    <Text
      className='karla'
      fontFamily="Karla, sans-serif"
      fontWeight="bold"
      fontStyle="italic"
      fontSize="xl" // Adjust font size as needed
      pt="5"
      pl="70px"   // Add 60px of padding on the left
    >
      {text}
    </Text>
  );
}

export default Year;
