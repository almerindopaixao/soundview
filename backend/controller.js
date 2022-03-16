import { ReadStream } from "fs";
import { Service } from "./service.js";

export class Controller {
    constructor() {
        this.service = new Service();
    }

    /**
     * @param {string} filename
     * @returns {Promise<{stream: ReadStream, type: string}>} Promise<{stream: ReadStream, type: string}>
     */
    async getFileStream(filename) {
        return this.service.getFileStream(filename);
    }
}
