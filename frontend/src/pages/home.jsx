import Header from "../components/headerHome";
import Title from "../components/title";
import Card from "../components/card";
import Year from "../components/years";
import Semester from "../components/semester";
import Add from "../components/addButton"
import { Box, Flex} from "@chakra-ui/react";
import React, { useState } from "react";
function Home() {

  const [addedCards, setAddedCards] = useState([]);

  return (
    <>
      <h1>TEST</h1>
      <Box>
        <Header />
        <div style={{ paddingTop: "60px" }}>
          <Title />
        </div>
        <Year text="YEAR 1"/>
        <Semester text="Semester 1"/>
        <Box>
          <Flex pl={10}>
          {addedCards.map((card, index) => (
                <Card
                key = {card.code}
                tag1={"Semester " + card.semester}
                tag2={card.units + " Units"}
                title={card.code}
                description="Ryan forgot to add the name"
              />
              ))}
          <Box ml={120} mt={75}>
            <Add addCard={(cardData) => setAddedCards([...addedCards, cardData])}/>
          </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
export default Home;
