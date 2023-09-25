// This is the AddButton component. It is responsible for rendering an Add button and a Drawer component.
// The Add button, when clicked, opens the Drawer component. The Drawer component contains a search input field.
// Importing necessary libraries and components
import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function AddButton() {
  // State for managing drawer open/close
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // State for managing search query and results
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to open the drawer
  const openDrawer = () => setIsDrawerOpen(true);

  // Function to close the drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Clear search query and results when closing the drawer
    setSearchTerm("");
    setSearchResults([]);
  };

  // Function to handle the search when the button is clicked
  const handleSearchButtonClick = () => {
    // Make an API request to your backend for searching
    fetch(`localhost:8080/api/courses/data?search=${searchTerm}`)
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

  return (
    <>
      <IconButton
        icon={<AddIcon color="white" />}
        bg="black"
        aria-label="Open Drawer"
        borderRadius="50%"
        onClick={openDrawer}
      />

      <Drawer
        placement="right"
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
        size="md" // Set the size of the drawer
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search</DrawerHeader>
            <DrawerBody>
              <Box p="4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="chakra-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearchButtonClick}>Search</button>

                {/* Display search results within the drawer */}
                <ul>
                  {searchResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                  ))}
                </ul>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default AddButton;
