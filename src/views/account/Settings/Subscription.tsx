import {
  Card,
  CardBody,
  Circle,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Subscription = () => {
  return (
    <Card _hover={{ bg: "gray.100" }}>
      <CardBody as={HStack} gap={5} alignItems={"center"}>
        <Circle size="60px" bg="green.500" />
        <VStack alignItems={"start"} gap={0}>
          <Heading
            as={"h6"}
            size={"md"}
            lineHeight={1.5}
            fontWeight={"semibold"}
          >
            Basic AI Service
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"} lineHeight={2}>
            Next charge on Jun 15, 2024, ¥498.00
          </Text>
        </VStack>
        <Spacer />
        <VStack>
          <Link to={"/"}>
            <Text
              lineHeight={2}
              color={"blue.500"}
              _hover={{
                color: "blue.700",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Cancel subscription
            </Text>
          </Link>
          <Link to={"/"}>
            <Text
              lineHeight={2}
              color={"blue.500"}
              _hover={{
                color: "blue.700",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Disable Auto-renewal
            </Text>
          </Link>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default Subscription;
