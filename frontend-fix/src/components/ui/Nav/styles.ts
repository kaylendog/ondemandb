import styled from "styled-components";
import { Button } from "../Button";

export const StyledNav = styled.nav`
	display: grid;
	grid: 4rem / 8rem auto auto auto 8rem;
`;

export const Brand = styled.h2`
	color: rgb(255, 255, 255, 0.5);
	grid-row: 1 / span 2;
	grid-column: 3 / span 1;
	text-align: center;
`;

export const Login = styled(Button)`
	grid-row: 1 / span 2;
	grid-column: 5 / span 1;
`;
