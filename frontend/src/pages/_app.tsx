import { ChakraProvider, theme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Nav } from "../components/ui/Nav";
import { store } from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Nav />
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}
