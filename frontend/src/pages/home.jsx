import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../components/headerHome";
import Title from "../components/title";
import Card from "../components/card";
import Year from "../components/years";
import Semester from "../components/semester";
import Add from "../components/addButton";

function Home() {
  const [addedCards, setAddedCards] = useState([]);
  const [years, setYears] = useState([1]);

  const addCard = (cardData, targetSemester) => {

      // Check if a card with the same code already exists
      const cardExists = addedCards.some((card) => card.code === cardData.code);
      if (cardExists) {
       alert("This course is already added.");
       return;
      }
       // Validate the semester
       if (cardData.semester !== targetSemester) {
         alert(`This course is designed for Semester ${cardData.semester} and can't be added to Semester ${targetSemester}.`);
         return;
       }
    // Check if the maximum limit of 4 cards per semester is reached
    const semesterCards = addedCards.filter((card) => card.semester === cardData.semester);
    console.log("Number of cards in the current semester:", semesterCards.length);
    if (semesterCards.length >= 4) { alert("Maximum limit of 4 courses per semester reached."); return;}

    // Add the card
    setAddedCards([...addedCards, cardData]);
  };

  // Function to delete a card
  const onDelete = (cardCode) => {
    const updatedCards = addedCards.filter((card) => card.code !== cardCode);
    setAddedCards(updatedCards);
  };

  // Function to add new year
  const addNewYear = () => {
     const nextYear = years[years.length - 1] + 1;
       setYears([...years, nextYear]);
     };

  return (
      <>
          <h1>TEST</h1>
          <Box>
              <Header />
              <div style={{ paddingTop: "60px" }}>
                  <Title />
              </div>

              {years.map((year) => (
                  <div key={year}>
                      <Year text={`YEAR ${year}`} />
                      {['Semester 1', 'Semester 2'].map((semesterText, semesterIndex) => (
                          <div key={semesterText}>
                              <Semester text={semesterText} />
                              <Box>
                                  <Flex pl={10}>
                                      {addedCards
                                          .filter((card) => card.semester === semesterIndex + 1)
                                          .map((card, Index) => (
                                              <Box key={card.code} position="relative" marginRight="10px">
                                                  <Card
                                                      tag1={"Semester " + card.semester}
                                                      tag2={card.units + " Units"}
                                                      title={card.code}
                                                      description="Ryan forgot to add the name"
                                                      code={card.code}
                                                      onDelete={onDelete}
                                                  />
                                              </Box>
                                          ))}
                                      <Box ml={10} mt={10}>
                                          <Add addCard={(cardData) => addCard(cardData, semesterIndex + 1)} />
                                      </Box>
                                  </Flex>
                              </Box>
                          </div>
                      ))}
                  </div>
              ))}
          <button onClick={addNewYear}>Add New Year</button>
                </Box>
              </>
            );
          }

export default Home;
