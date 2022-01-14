import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// Apparently it isn't a risk to expose either of these, so here you go!
export const app = initializeApp({
	appId: "ondemandb-182b2",
	apiKey: "AIzaSyCVBUzPc-41OnCQTFl7XSrLze_hQsYr088 ",
});
export const auth = getAuth(app);
// enable auth emulator
if (process.env.NODE_ENV === "development") {
	connectAuthEmulator(auth, "http://localhost:9099");
}
