import React, { useState } from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import Header from "../components/headerHome";
import Title from "../components/title";
import Card from "../components/card";
import Year from "../components/years";
import Semester from "../components/semester";
import Add from "../components/addButton";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


function Home() {
  const [addedCards, setAddedCards] = useState([]);
  const [years, setYears] = useState([]); // Empty array as the initial state
  const [isPDFMode, setIsPDFMode] = useState(false);


  const saveAsPDF = () => {
    setIsPDFMode(true);
    // Temporarily hide elements
    const addButtons = document.querySelectorAll("[data-hide-for-pdf='true']");
    addButtons.forEach(btn => btn.style.display = "none");

    const input = document.getElementById("contentToSave");

    const canvasWidth = input.clientWidth;
    const canvasHeight = input.clientHeight;

    // Increasing scale for better resolution
    html2canvas(input, { scale: 3 }) // Here scale is set to 3, can adjust if needed
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Calculate the aspect ratio of the content to fit it into PDF
        const imgWidth = 210;  // PDF width
        const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4"
        });
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("courses.pdf");

        setIsPDFMode(false);
        // Restore the visibility of the elements
        addButtons.forEach(btn => btn.style.display = "block");
      });
  };


  // Modified to add courses to the current year's array
  const addCard = (cardData, yearIndex, targetSemester) => {
    const currentYearCards = addedCards[yearIndex]; // Use the given year index

   // Check if a card with the same code already exists in the current year
    const cardExists = currentYearCards.some((card) => card.code === cardData.code);
      if (cardExists) {
        alert("This course is already added.");
        return;
      }

    // Validate the semester
    if (cardData.semester !== targetSemester) {
    alert(`This course is designed for Semester ${cardData.semester} and can't be added to Semester ${targetSemester}.`);return; }

    // Check if the maximum limit of 4 cards per semester is reached
    const semesterCards = currentYearCards.filter((card) => card.semester === cardData.semester);
      if (semesterCards.length >= 4) {
        alert("Maximum limit of 4 courses per semester reached.");
        return;
      }

    // Add the card to the current year
    const updatedYearCards = [...currentYearCards, cardData];
    const updatedAllCards = [...addedCards];
    updatedAllCards[yearIndex] = updatedYearCards;
    setAddedCards(updatedAllCards);
    };

   // Function to delete a card
    const onDelete = (cardCode, yearIndex) => {
        const updatedCards = [...addedCards];
        updatedCards[yearIndex] = updatedCards[yearIndex].filter(card => card.code !== cardCode);
        setAddedCards(updatedCards);
    };

    // Function to delete a year
    const deleteYear = (yearIndex) => {
        // Remove the year from the years array
        const updatedYears = [...years];
        updatedYears.splice(yearIndex, 1);
        setYears(updatedYears);

        // Remove the courses for that year
        const updatedCards = [...addedCards];
        updatedCards.splice(yearIndex, 1);
        setAddedCards(updatedCards);
    };


  const addNewYear = () => {
    setYears([...years, {}]);  // We just add an empty object to denote a new year.
    setAddedCards([...addedCards, []]);
  };

return (
<>
  <h1>TEST</h1>
  <Box>
      <Header />
      <div style={{ paddingTop: "60px" }}>
          <Title onSave={saveAsPDF} isPDFMode={isPDFMode}/>
      </div>
      <div id="contentToSave">
      {years.map((year, yearIndex) => (
        <div key={year}>
          <Year
            text={`YEAR ${yearIndex + 1}`}  // Use the yearIndex + 1 as the year number.
            onDelete={() => deleteYear(yearIndex)}
          />
            {['Semester 1', 'Semester 2'].map((semesterText, semesterIndex) => (
              <div key={semesterText} style={{ marginBottom: semesterIndex === 0 ? '20px' : '0' }}>
                <Semester text={semesterText} />
                  <Box>
                    <Flex pl={10}>
                      {addedCards[yearIndex]
                        .filter((card) => card.semester === semesterIndex + 1)
                        .map((card, Index) => (
                          <Box key={card.code} position="relative" marginRight="10px">
                            <Card
                              tag1={"Semester " + card.semester}
                              tag2={card.units + " Units"}
                              title={card.code}
                              description="Ryan forgot to add the name"
                              code={card.code}
                              onDelete={() => onDelete(card.code, yearIndex)}
                            />
                          </Box>
                        ))}
                    <Box ml={10} mt={10}>
                  <Add addCard={(cardData) => addCard(cardData, yearIndex, semesterIndex + 1)} />
                </Box>
              </Flex>
            </Box>
          </div>
        ))}
      </div>
    ))}
    </div>
    <Box width="100%" py="20px" display="flex" justifyContent="center">
            <Button
              data-hide-for-pdf="true"
              onClick={addNewYear}
              borderRadius= "full"
              bg="#BB8B00"
              color="white"
              _hover={{ bg: "Black" }}
              >
              ADD YEAR
            </Button>
          </Box>
    </Box>
  </>
);
}
export default Home;
