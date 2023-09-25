import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  Button,
  Flex, // Import Flex component
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import Card from "../components/card";

function AddButton({ addCard }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleSearchButtonClick = () => {
    // Make an API request to your backend for searching
    fetch(`http://localhost:8080/api/courses/data?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response by updating the searchResults state
        setSearchResults(data); // Assuming the API returns an array of results
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleCardClick = (cardData) => {
    addCard(cardData);
    closeDrawer();
  };

  return (
    <>
      <IconButton
        icon={<AddIcon color="gold" />} // Change the button color to gold
        bg="black"
        aria-label="Open Drawer"
        borderRadius="50%"
        onClick={openDrawer}
        size="lg"
      />

      <Drawer
        placement="right"
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search</DrawerHeader>
            <DrawerBody>
              <Box p="5">
                <Flex> {/* Use Flex to create a horizontal layout */}
                  <Input
                    type="text"
                    placeholder="Search Courses ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="lg"
                  />
                  <Button
                    colorScheme="teal"
                    leftIcon={<SearchIcon />}
                    onClick={handleSearchButtonClick}
                    ml="2" // Add margin-left for spacing
                    mt="0" // Remove margin-top
                  >
                    Search
                  </Button>
                </Flex>

                <Box mt="4">
                  {searchResults.map((result, index) => (
                    <div key={result.id} onClick={() => handleCardClick(result)}>
                      <Card
                        key={result.code}
                        tag1={"Semester " + result.semester}
                        tag2={result.units + " Units"}
                        title={result.code}
                        description="Ryan forgot to add the name"
                      />
                    </div>
                  ))}
                </Box>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default AddButton;
