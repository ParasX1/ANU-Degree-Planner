// // This is the CourseCard component. It is used to display individual courses in the Degree Planner application.
// This is the CourseCard component. It is used to display individual courses in the Degree Planner application.
// Each CourseCard displays two tags, a title, and a description of the course.
// Importing necessary libraries and components
import React from "react";
import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Tag,
  Flex,
  IconButton,
  Link as ChakraLink
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// Function component for the CourseCard
function CourseCard({
  tag1, // First tag for the course
  tag2, // Second tag for the course
  title, // Title of the course
  description, // Description of the course
  code,
  onDelete, // receive onDelete prop here
}) {
  // Render the CourseCard
  return (
    // Box component for padding and max width
    <Box p={5} pl={10} maxWidth="400px" position="relative">
      <Card maxW="md" border="1px" borderColor="black" borderRadius={10} h="100%">
        <CardBody>
          <Stack mt="3" spacing="1">
            <Flex px={4} py={2} ml={-2}>
              <Tag
                px={4}
                py={1}
                size="md"
                variant="solid"
                borderRadius="full"
                backgroundColor={"#e2beff"}
                textColor={"black"}
                className='karla'
                fontWeight="light"
              >
                {tag1}
              </Tag>
              <Tag
                mx={3}
                px={4}
                py={1}
                size="md"
                variant="solid"
                backgroundColor={"#b5fbff"}
                textColor={"black"}
                borderRadius="full"
                className='karla'
                fontWeight="light"
              >
                {tag2}
              </Tag>
              <IconButton
                icon={<CloseIcon />}
                aria-label="Delete Card"
                size="sm"
                variant="ghost"
                position="absolute"
                top="0"
                right="0"
                onClick={() => onDelete(code)}
              />
            </Flex>
            <Box pl={5} pt={2} pb={2} ml={-2}>
              <Heading size="md" py={1} className='karla' fontWeight="medium">
                <ChakraLink
                    href={`https://programsandcourses.anu.edu.au/2023/course/${title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue.500"
                    _hover={{ textDecoration: 'underline' }}
                >
                  {title}
                </ChakraLink>
              </Heading>
              <Text
                className='karla'
                fontWeight="light"
                fontStyle="italic"
                fontSize="xs" // Smaller font size (adjust as needed)
                paddingRight={3}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {description}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

// Exporting the CourseCard component
export default CourseCard;
