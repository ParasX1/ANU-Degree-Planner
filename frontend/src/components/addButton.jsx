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

// Function component for the AddButton
function AddButton() {
  // State for managing drawer open/close
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to open the drawer
  const openDrawer = () => setIsDrawerOpen(true);
  // Function to close the drawer
  const closeDrawer = () => setIsDrawerOpen(false);

  // Render the AddButton and Drawer
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
                />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

// Exporting the AddButton component
export default AddButton;
