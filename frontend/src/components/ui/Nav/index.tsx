import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Account } from "./Account";

export const Nav = () => (
	<Flex padding={"4"} alignItems={"center"}>
		<Heading as="h2" size="md" isTruncated>
			ondemandb
		</Heading>
		<Spacer />
		<Account />
	</Flex>
);
