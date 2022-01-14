import { RequestHandler } from "express";

import { BackendServer } from "../server";

export type RH = (server: BackendServer) => RequestHandler;
