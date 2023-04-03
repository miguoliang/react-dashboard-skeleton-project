import React from "react";
import { Table, TBody, Td, Th, THead, Tr } from "components/ui";

const Compact = () => {
  return (
    <div>
      <Table compact>
        <THead>
          <Tr>
            <Th>Company</Th>
            <Th>Contact</Th>
            <Th>Country</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
          </Tr>
          <Tr>
            <Td>Centro comercial Moctezuma</Td>
            <Td>Francisco Chang</Td>
            <Td>Mexico</Td>
          </Tr>
          <Tr>
            <Td>Ernst Handel</Td>
            <Td>Roland Mendel</Td>
            <Td>Austria</Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  );
};

export default Compact;
