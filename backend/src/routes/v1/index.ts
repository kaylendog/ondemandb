import { Router } from "express";
import { RH } from "../types";
import { databases } from "./databases";

export const v1: RH = server => Router().use("/databases", databases(server));
