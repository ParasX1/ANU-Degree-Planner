import React, { useState, useCallback } from "react";
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

  const searchDatabase = useCallback(() => {
    // if search term is empty, avoid making the API call.
    if (searchTerm.trim() === "") return;
  
    fetch(`http://localhost:8080/api/courses/data?search=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error(error));
  }, [searchTerm]); // declaring searchTerm as a dependency as it’s used inside the function

  const handleCardClick = (cardData) => {
    addCard(cardData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default behavour
    searchDatabase(); //Calls the search API
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
                <form onSubmit={handleFormSubmit}> 
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
                      onClick={searchDatabase}
                      ml="2" // Add margin-left for spacing
                      mt="0" // Remove margin-top
                    >
                      Search
                    </Button>
                  </Flex>
                </form>
                <Box mt="4">
                  {searchResults.map((result, index) => (
                    <div key={result.id} onClick={() => handleCardClick(result)}>
                      <Card
                        key={result.code}
                        tag1={"Semester " + result.semester}
                        tag2={result.units + " Units"}
                        title={result.code}
                        description={result.description}
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
