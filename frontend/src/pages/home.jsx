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

  const [years, setYears] = useState([]); //Stores a list of years. Each year stores two semesters. Each semester stores courses.
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

  const validateDegree = () => {

    

  }


  // Modified to add courses to the current year's array
  const addCard = (cardData, yearIndex, targetSemester) => {

    const currentYear = years[yearIndex]
    
    if (!currentYear) {
      console.log("Year doesn't exist");
      return;
    }

    const semesterIdx = targetSemester - 1;
    const currentSemester = currentYear[semesterIdx];

    // Check if the card can be added to the semester.
    if (cardData.semester !== targetSemester && cardData.semester !== 3 && cardData.semester !== -1) {
      alert(`This course is designed for Semester ${cardData.semester} and can't be added to Semester ${targetSemester}.`);
      return;
    }

    // Check if a card with the same code already exists in the current year
    if (currentSemester.some((card) => card.code === cardData.code)) {
      alert("This course has already been added");
      return;
    }

    // Check if the semester limit has already been reached.
    if (currentSemester.length >= 4) {
      alert("Maximum limit of 4 courses per semester reached.");
      return;
    }

    // Add the course to the semester.
    const updatedYear = [...years];
    updatedYear[yearIndex][semesterIdx] = [...currentSemester, cardData];
    setYears(updatedYear);
    };

   // Function to delete a card
    const onDelete = (cardCode, yearIndex, semesterIndex) => {
      const updatedYears = [...years];
      updatedYears[yearIndex][semesterIndex] = updatedYears[yearIndex][semesterIndex].filter(card => card.code !== cardCode);
      setYears(updatedYears);
    };

    // Function to delete a year
    const deleteYear = (yearIndex) => {
        // Remove the year from the years array
        const updatedYears = [...years];
        updatedYears.splice(yearIndex, 1);
        setYears(updatedYears);
    };


  const addNewYear = () => {
    setYears([...years, [[], []]]);
  };

return (
<>
  <h1>HOME</h1>
  <Box>
      <Header />
      <div style={{ paddingTop: "60px" }}>
          <Title onSave={saveAsPDF} isPDFMode={isPDFMode} onValidate={validateDegree}/>
      </div>
      <div id="contentToSave">
      {years.map((year, yearIndex) => (
        <div key={yearIndex}>
          <Year
            text={`YEAR ${yearIndex + 1}`}  // Use the yearIndex + 1 as the year number.
            onDelete={() => deleteYear(yearIndex)}
          />
            {['Semester 1', 'Semester 2'].map((semesterText, semesterIndex) => (
              <div key={semesterText} style={{ marginBottom: semesterIndex === 0 ? '20px' : '0' }}>
                <Semester text={semesterText} />
                  <Box>
                    <Flex pl={10}>
                      {year[semesterIndex]
                        .map((card, Index) => (
                          <Box key={card.code} position="relative" marginRight="10px">
                            <Card
                              tag1={"Semester " + card.semester}
                              tag2={card.units + " Units"}
                              title={card.code}
                              description={card.description}
                              code={card.code}
                              onDelete={() => onDelete(card.code, yearIndex, semesterIndex)}
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
