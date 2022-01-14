import {
	Button,
	Center,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Select,
	SlideFade,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/slices/user";
import { DatabaseCreationState, setCreationState } from "../redux/slices/database";

interface FormData {
	database: string;
}

export default function Landing() {
	const progress = useAppSelector(state => state.database.creationState);
	const isLoggedIn = useAppSelector(state => state.user.loggedIn);
	const dispatch = useAppDispatch();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>();

	const submit = async () => {
		dispatch(setCreationState(DatabaseCreationState.AUTHORIZING));
		if (!isLoggedIn) {
			await dispatch(login());
		}
		dispatch(setCreationState(DatabaseCreationState.CREATING));
	};

	return (
		<Center>
			<Container textAlign={"center"} margin={4} marginTop={20}>
				<Heading>
					I think we know what you need right now...
					<b> a database!</b>
				</Heading>
				<form onSubmit={handleSubmit(submit)}>
					<FormControl isInvalid={!!errors.database}>
						<Flex
							direction="row"
							justifyContent={"center"}
							marginTop={8}
							alignItems="center"
						>
							<Stack direction={"column"} width={300} marginRight={4}>
								<Stack direction={"row"}>
									<Select
										value={0}
										disabled={progress != DatabaseCreationState.NONE}
										{...register("database", { required: true })}
									>
										<option value="postgresql">PostgreSQL</option>
										<option disabled value="mariadb">
											MariaDB
										</option>
									</Select>

									<Button
										isLoading={progress != DatabaseCreationState.NONE}
										type="submit"
										colorScheme={"pink"}
										width={"auto"}
									>
										Create!
									</Button>
								</Stack>
								{!!errors.database && (
									<FormErrorMessage>
										Please select a server software!
									</FormErrorMessage>
								)}
							</Stack>
						</Flex>
					</FormControl>
				</form>

				<SlideFade in={progress != DatabaseCreationState.NONE} offsetY={20}>
					<Progress marginTop={8} isIndeterminate colorScheme={"pink"} />
					{progress == DatabaseCreationState.AUTHORIZING && (
						<Text marginTop={8}>Contacting server...</Text>
					)}
					{progress == DatabaseCreationState.CREATING && (
						<Text marginTop={8}>Creating database...</Text>
					)}
				</SlideFade>
			</Container>
		</Center>
	);
}
