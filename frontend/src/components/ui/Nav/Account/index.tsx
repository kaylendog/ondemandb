import { Button, Icon } from "@chakra-ui/react";
import { useAppSelector } from "../../../../redux/hooks";

import { FaUser } from "react-icons/fa";

export const Account = () => {
	const isLoggedIn = useAppSelector(state => state.user.loggedIn);
	return isLoggedIn ? <Icon as={FaUser}></Icon> : <Button colorScheme={"pink"}>Login</Button>;
};
