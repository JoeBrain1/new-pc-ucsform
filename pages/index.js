"use client"
import { Container, Heading, FormControl, FormLabel, Textarea, FormErrorMessage, Button, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from '../lib/api';

const initValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}
const iniState = {values: initValues}

export default function Home() {
  const [state, setState ] = useState(iniState);
  const [ touched, setTouched ] = useState({})
  const {values, isLoading, error} = state;
  const toast = useToast();

  const onBlur = ({ target }) => setTouched((prev) => ({
    ...prev, 
    [target.name]: true
  }))

  const handleChange = ({ target }) => setState((prev) => ({
    ...prev, 
    values: {
      ...prev.values,
      [target.name]: target.value
    }
  }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true
    }));
    // calling the function
    try {
      await sendContactForm(values);
      setTouched({});
      setState(iniState);
      toast({
        title: "Message sent successfully",
        status: "success",
        duration: 2000,
        position: "top"
      })
    }catch(error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));

    }
  }



  return (
    // Using Chakra to create all the form inputs
    <Container maxW="450px" mt={12}>
      <Heading>Contact</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
        <FormLabel>Name</FormLabel>
        <input 
          type="text" 
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}

        />
        <FormErrorMessage>name require</FormErrorMessage>

      </FormControl>

      <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
        <FormLabel>
          Email
        </FormLabel>

        <input 
          type="email" 
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}

        />
        <FormErrorMessage>email required</FormErrorMessage>

      </FormControl>

      <FormControl isRequired isInvalid={touched.subject && !values.subject} mb={5}>
        <FormLabel>
          Subject
        </FormLabel>

        <input 
          type="text" 
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}

        />
        <FormErrorMessage>subject required</FormErrorMessage>

      </FormControl>

      <FormControl isRequired isInvalid={touched.message && !values.message} mb={5}>
        <FormLabel>
          Message
        </FormLabel>

        <Textarea 
          type="text" 
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={4}
          onBlur={onBlur}

        />
        <FormErrorMessage>message required</FormErrorMessage>

      </FormControl>

      <Button
        isLoading={isLoading}
        variant="outline"
        colorScheme="blue"
        disabled={!values.name || !values.email || !values.subject || !values.message}
        onClick={onSubmit}
      >
        Submit

      </Button>



    </Container>
  )
}
