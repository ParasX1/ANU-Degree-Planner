// This is a functional component for rendering a semester text in the degree planner application.
// It uses the Text component from the Chakra UI library and applies specific styles to it.
import React from "react";
import { Text } from "@chakra-ui/react";

function Semester({ text }) {
  return (
    <Text
      fontFamily="Karla, sans-serif"
      fontWeight="light"
      fontStyle="italic"
      fontSize="xl" 
      pl="70px"   // 70px of padding on the left
      pt="3px"    // 3px of padding on the top
    >
      {text}
    </Text>
  );
}

export default Semester;
