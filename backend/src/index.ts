/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from "dotenv";

import { BackendServer } from "./server";

// load environment variables if not in production environment
if (process.env.NODE_ENV !== "production") {
	config();
}

console.log(`
@ondemandb/backend v${require("../package.json").version}
Author: ${require("../package.json").author.name} <${require("../package.json").author.email}>
`);

const server = new BackendServer({
	port: parseInt(process.env.PORT ?? "8080"),
	firebaseCertPath: process.env.FIREBASE_CERT_PATH ?? "",
});
server.start().catch(err => server.logger.error(err));
