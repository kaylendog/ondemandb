import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html, body, #__next {
	margin: 0;
	font-family: 'Fira Sans', sans-serif;

	background: #312f40;
	color: rgb(255, 255, 255, 0.8);
	font-weight: normal;
}

b {
	color: white;
	font-weight: bold;
}
`;
