import styled from "styled-components";

export const Button = styled.button`
	background: rgb(255, 255, 255, 0.3);
	border: none;
	border-radius: 4px;
	padding: 1.8rem;

	font-size: 1rem;
	color: white;
	font-family: "Fira Sans", sans-serif;

	transition: all 50ms ease-in-out;

	&:hover {
		background: rgb(255, 255, 255, 0.5);
	}

	&:active {
		background: rgb(255, 255, 255, 0.4);
	}
`;
