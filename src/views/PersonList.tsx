import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Person } from "../models/person";
import { apiGetPersonList } from "../services/PersonService";

const PersonList = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    apiGetPersonList()
      .then((res) => res.data.content)
      .then((data) => setPersons(data));
  }, []);

  return (
    <VStack>
      {persons.map((person) => (
        <Text key={person.id}>{person.name}</Text>
      ))}
    </VStack>
  );
};

export default PersonList;
