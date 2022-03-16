import config from "./config.js";
import backend from "./backend.js";
import { logger } from "./util.js";

backend
    .listen(config.port)
    .on("listening", () => logger.info(`backend running at ${config.port}!!`));
