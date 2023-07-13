import { Button, useBoolean } from "@chakra-ui/react";
import { Person } from "models/person";
import { useEffect, useState } from "react";
import { apiGetPersonList } from "../services/PersonService";
import { motion } from "framer-motion";

const Home = () => {
  const [expanded, setExpanded] = useBoolean(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [height, setHeight] = useState("auto");
  const onToggle = () => {
    setExpanded.toggle();
    setHeight(expanded ? "auto" : "0px");
  };

  useEffect(() => {
    apiGetPersonList()
      .then((res) => res.data.content)
      .then((data) => setPersons(data));
  }, []);

  return (
    <>
      <h1>Home</h1>
      <Button onClick={onToggle}>{expanded ? "Collapse" : "Expand"}</Button>
      <motion.div
        animate={{ height }}
        className={"overflow-hidden"}
        transition={{ type: "spring", bounce: 0 }}
      >
        {persons.map((person) => (
          <div key={person.id}>{person.name}</div>
        ))}
      </motion.div>
    </>
  );
};

export default Home;
