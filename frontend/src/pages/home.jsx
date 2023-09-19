import Header from "../components/headerHome";
import Title from "../components/title";
import Card from "../components/card";
import Year from "../components/years";
import Semester from "../components/semester";
import Add from "../components/addButton"
import { Box, Flex} from "@chakra-ui/react";
function Home() {
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
          <Card
            tag1="Semester 1"
            tag2="6 Units"
            title="COMP1100"
            description="Programming as Problem Solving"
          />
          <Card
            tag1="Semester 1"
            tag2="6 Units"
            title="MATH1005"
            description="Discrete Mathematics"
          />
          <Box ml={120} mt={75}> 
            <Add/>
          </Box>
          </Flex>
          <Semester text="Semester 2"/>
        </Box>
      </Box>
    </>
  );
}
export default Home;
