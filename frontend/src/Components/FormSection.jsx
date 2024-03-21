import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  HStack,
  RadioGroup,
  Radio,
  VStack,
  Textarea,
  Button,
} from "@chakra-ui/react";
import axios, { Axios } from "axios";

const FormSection = () => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [inputs, setInputs] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnfilledUsername, setIsUnfilledUsername] = useState(false);
  const [isUnfilledCode, setIsUnfilledCode] = useState(false);
  const [isUnfilledLanguage, setIsUnfilledLanguage] = useState(false);

  const SERVER_URL = "http://localhost:3100";

  const handleSubmit = async () => {
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

    setIsLoading(true);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/snippets/add`,
        {
          username: username,
          language: language,
          inputs: inputs,
          code: code,
        },
        config
      );

      console.log(
        `\nLogging response from server after adding snippet at database : ${data}\n`
      );

      setIsLoading(false);
      setInputs("");
      setCode("");
      setLanguage("");
      setUsername("");
    } catch (err) {
      setIsLoading(false);
      setInputs("");
      setCode("");
      setLanguage("");
      setUsername("");
      console.log(`\nError in axios post : ${err}\n`);
      throw err;
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
            value={language}
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
