import Header from "../components/headerHome";
import Title from "../components/title";
import Card from "../components/card";
import Year from "../components/years";
import Semester from "../components/semester";
import Add from "../components/addButton";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

function Home() {
  const [addedCards, setAddedCards] = useState([]);

  const addCard = (cardData) => {
    // Check if a card with the same code already exists
    const cardExists = addedCards.some((card) => card.code === cardData.code);
    if (cardExists) { alert("This course is already added."); return;}

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

  return (
    <>
      <h1>TEST</h1>
      <Box>
        <Header />
        <div style={{ paddingTop: "60px" }}>
          <Title />
        </div>
        <Year text="YEAR 1" />
        <Semester text="Semester 1" />
        <Box>
          <Flex pl={10}>
            {addedCards.map((card, index) => (
              <Box
                key={card.code}
                position="relative"
                marginRight="10px"
              >
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
            <Box ml={120} mt={75}>
              <Add addCard={addCard} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default Home;
