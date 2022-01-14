/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
import "reflect-metadata";

import { config } from "dotenv";

import { BackendServer } from "./server";

// load environment variables if not in production environment
if (process.env.NODE_ENV !== "production") {
	config();
}

console.log(`
@gboxide/backend v${require("../package.json").version}
Author: ${require("../package.json").author}
`);

const server = new BackendServer({
	port: parseInt(process.env.PORT ?? "8080"),
	firebaseCertPath: process.env.FIREBASE_CERT_PATH ?? "",
});
server.start().catch(err => server.logger.error(err));
