// This is the Header component for the Degree Planner application. It renders a fixed header at the top of the page with the text "DEGREE PLANNER".
import React from 'react';
import { Box, Text } from '@chakra-ui/react';


function Header() {
  return (
    <>
      <Box
        bg="#BB8B00"
        color="white"
        p={4}
        textAlign="left"
        width="100%"
        position="fixed"
        top={0}
        zIndex={999}
      >
        <Text className='karla' fontSize="18px" fontFamily="heading" fontWeight="bold" paddingLeft="60px" paddingTop="2px" paddingBottom="2px">
          DEGREE PLANNER
        </Text>
      </Box>
      </>
  );
}

export default Header;
