import styled from "styled-components";
import { Button } from "../components/ui/Button";

export const Centered = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	flex-direction: column;
	text-align: center;
`;

const Container = styled.div`
	max-width: 768px;
`;

export const Tagline = styled.h1`
	margin: 4rem 0;
`;

export default function Home() {
	return (
		<Centered>
			<Container>
				<Tagline>
					I think we know what you need right now... <br />
					<b>...a database!</b>
				</Tagline>
				<Button>Make me a database!</Button>
			</Container>
		</Centered>
	);
}
