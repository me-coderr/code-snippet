import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  HStack,
  RadioGroup,
  Radio,
  VStack,
  Textarea,
  Button,
} from "@chakra-ui/react";

const FormSection = () => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [inputs, setInputs] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnfilledUsername, setIsUnfilledUsername] = useState(false);
  const [isUnfilledCode, setIsUnfilledCode] = useState(false);
  const [isUnfilledLanguage, setIsUnfilledLanguage] = useState(false);

  const handleSubmit = () => {
    let unfilledUsername = false,
      unfilledLanguage = false,
      unfilledCode = false;
    if (!username) {
      unfilledUsername = true;
    }
    if (!language) {
      unfilledLanguage = true;
    }
    if (!code) {
      unfilledCode = true;
    }
    setIsUnfilledUsername(unfilledUsername);
    setIsUnfilledCode(unfilledCode);
    setIsUnfilledLanguage(unfilledLanguage);
    if (unfilledCode || unfilledUsername || unfilledLanguage) {
      return;
    }
  };

  // useEffect(() => {
  //   console.log(language);
  // }, [language]);
  // useEffect(() => {
  //   console.log(username);
  // }, [username]);

  return (
    <>
      <VStack spacing={10}>
        <FormControl isRequired isInvalid={isUnfilledUsername}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              if (isUnfilledUsername && e.target.value) {
                setIsUnfilledUsername(false);
              }
              setUsername(e.target.value);
            }}
          />
          <FormErrorMessage>Please enter a username.</FormErrorMessage>
        </FormControl>
        <FormControl isRequired as="fieldset" isInvalid={isUnfilledLanguage}>
          <FormLabel as="legend">
            Select your Preferred Coding Language
          </FormLabel>
          <RadioGroup
            onChange={(e) => {
              if (isUnfilledLanguage && e) {
                setIsUnfilledLanguage(false);
              }
              setLanguage(e);
            }}
          >
            <HStack spacing="30px">
              <Radio value="C++">C++</Radio>
              <Radio value="Java">Java</Radio>
              <Radio value="JavaScript">JavaScript</Radio>
              <Radio value="Python">Python</Radio>
            </HStack>
          </RadioGroup>
          <FormErrorMessage>
            Please select your coding language.
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Enter inputs for your code here:</FormLabel>
          <Textarea
            type="text"
            placeholder="Enter inputs for your code"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired isInvalid={isUnfilledCode}>
          <FormLabel>Enter your code here:</FormLabel>
          <Textarea
            type="text"
            placeholder="Enter your code"
            value={code}
            onChange={(e) => {
              if (isUnfilledCode && e.target.value) {
                setIsUnfilledCode(false);
              }
              setCode(e.target.value);
            }}
          />
          <FormErrorMessage>Please enter your code.</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoading}
          colorScheme="green"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </VStack>
    </>
  );
};

export default FormSection;
