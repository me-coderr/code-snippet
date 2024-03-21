import "./App.css";
import FormSection from "./Components/FormSection";
import Dashboard from "./Components/Dashboard";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  return (
    <>
      <Card
        align="center"
        variant={"elevated"}
        paddingLeft={"0px"}
        paddingRight={"0px"}
        minHeight={"100vh"}
        backgroundColor={"darkgrey"}
        overflow={"hidden"}
      >
        <CardHeader>
          <Heading size="xl" fontFamily={"sans-serif"}>
            takeUforward
          </Heading>
        </CardHeader>
        <CardBody>
          <Tabs
            isFitted
            variant="soft-rounded"
            minWidth={
              isDashboardOpen
                ? window.innerWidth - 0.05 * window.innerWidth
                : { base: "300px", sm: "500px", md: "700px" }
            }
            minHeight={"200px"}
            colorScheme="green"
            marginTop={3}
            backgroundColor={"white"}
            borderRadius={10}
            padding={3}
            overflow={"scroll"}
          >
            <TabList mb="1em">
              <Tab onClick={() => setIsDashboardOpen(false)}>Form</Tab>
              <Tab onClick={() => setIsDashboardOpen(true)}>Dashboard</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormSection />
              </TabPanel>
              <TabPanel>
                <Dashboard isOpen={isDashboardOpen} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
