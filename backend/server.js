import { createbackend } from "http";
import { handler } from "./routes.js";

export default createbackend(handler);
