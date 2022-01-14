import express, { json } from "express";
import morgan from "morgan";
import { createLogger, format, transports } from "winston";

import { PrismaClient } from "@prisma/client";

import { registerRoutes } from "./routes";

import { initializeApp, App as FirebaseApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { resolve } from "path";
import { getAuth } from "firebase-admin/auth";

/**
 * Server options provided to the database server.
 */
interface ServerOptions {
	port: number;
	firebaseCertPath: string;
}

/**
 * Represents the database server and its gRPC server.
 */
export class BackendServer {
	/**
	 * The Prisma database client.
	 */
	readonly prisma = new PrismaClient();

	/**
	 * The database logger.
	 */
	readonly logger = createLogger({
		transports: [new transports.Console()],
		format: format.combine(format.colorize(), format.simple()),
		level: "http",
	});

	/**
	 * The express server.
	 */
	app = express();

	/**
	 * The Firebase authentication client.
	 * @param options
	 */
	firebase!: FirebaseApp;

	/**
	 * The firebase authentication service.
	 */
	get auth() {
		return getAuth(this.firebase);
	}

	constructor(readonly options: ServerOptions) {}

	/**
	 * Start the server.
	 */
	async start(): Promise<void> {
		await this.initializeDatabase();
		this.initializeFirebase();
		this.setupExpress();
		// listen on the specified port
		this.app.listen(this.options.port);
		// log success
		this.logger.info(`🚀 Server ready at http://localhost:${this.options.port}`);
		console.log();
	}

	/**
	 * Initialize the Prisma database client.
	 */
	async initializeDatabase() {
		this.logger.verbose("Initializing database...");
		await this.prisma.$connect();
	}

	initializeFirebase() {
		this.logger.verbose("Initializing Firebase...");
		// initialize firebase
		this.firebase = initializeApp({
			credential: credential.cert(resolve(this.options.firebaseCertPath)),
		});
	}

	/**
	 * Setup the express server.
	 */
	setupExpress() {
		this.logger.verbose("Setting up Express...");
		// setup morgan middleware
		this.app.use(
			morgan("dev", {
				stream: { write: (message: string) => this.logger.http(message.slice(0, -1)) },
			})
		);
		this.app.use(json());
		// setup graphql middleware
		registerRoutes(this);
	}

	/**
	 * Verify a user token is valid.
	 * @param token
	 * @returns
	 */
	verifyToken(token: string) {
		return this.auth.verifyIdToken(token).then(
			() => true,
			() => false
		);
	}
}
