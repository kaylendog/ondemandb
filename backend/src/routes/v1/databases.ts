import { Router } from "express";
import { UserRecord } from "firebase-admin/auth";
import { RH } from "../types";

import { internalServerError } from "../../errors";

export const databases: RH = server =>
	Router().post("/", async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const uid: string | undefined = req.signedCookies?.["User-Uid"];
		// if the uuid cookie does not exist, return an unauthorized error
		let user: UserRecord | undefined;
		if (uid === undefined) {
			user = await server.auth.createUser({}).catch(() => undefined);
		} else {
			user = await server.auth.getUser(uid).catch(() => undefined);
		}
		// If the user is undefined, either we failed to create one, or we failed to get one.
		// In either case, we can't proceed.
		if (user === undefined) {
			return internalServerError(res);
		}

		res.cookie("User-Uid", user.uid, { sameSite: true, secure: true });

		return res.json({
			id: user.uid,
		});
	});
