import { useState } from "react";
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

function App() {
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
          <Heading size="md">takeUforward</Heading>
        </CardHeader>
        <CardBody>
          <Tabs
            isFitted
            variant="soft-rounded"
            minWidth={{ base: "300px", sm: "500px", md: "700px" }}
            colorScheme="green"
            marginTop={3}
            backgroundColor={"white"}
            borderRadius={10}
            padding={3}
            overflow={"scroll"}
          >
            <TabList mb="1em">
              <Tab>Form</Tab>
              <Tab>Dashboard</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormSection />
              </TabPanel>
              <TabPanel>
                <Dashboard />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
