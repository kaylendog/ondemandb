import { Response } from "express";

type RHL = (response: Response) => void;

export const notFound: RHL = res =>
	res.status(404).json({
		code: 0,
		msg: "Error 404: Not Found.",
	});

export const badRequest: RHL = res =>
	res.status(400).json({
		code: 1,
		msg: "Error 400: Bad Request.",
	});

export const unauthorized: RHL = res =>
	res.status(401).json({
		code: 2,
		msg: "Error 401: Unauthorized.",
	});

export const internalServerError: RHL = res =>
	res.status(500).json({
		code: 3,
		msg: "Error 500: Internal Server Error.",
	});
