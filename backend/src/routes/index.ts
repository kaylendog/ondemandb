import { BackendServer } from "../server";

import { v1 } from "./v1";

export const registerRoutes = (server: BackendServer) => {
	server.app.use("/v1", v1(server));
};
