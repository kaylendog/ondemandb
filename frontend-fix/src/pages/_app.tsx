import { AppProps } from "next/app";
import { Nav } from "../components/ui/Nav";
import { GlobalStyle } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<Nav />
			<Component {...pageProps} />
		</>
	);
}
