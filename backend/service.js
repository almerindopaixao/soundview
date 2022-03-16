import { createReadStream, ReadStream } from "fs";
import { access } from "fs/promises";
import config from "./config.js";
import { join, extname } from "path";

const {
    dir: { frontendDirectory },
} = config;

export class Service {
    /**
     *
     * @param {string} filename
     * @returns {ReadStream}
     */
    createFileStream(filename) {
        return createReadStream(filename);
    }

    /**
     * @param {string} file string
     * @returns {Promise<{type: string, name: string}>} Promise<{type: string, name: string}>
     */
    async getFileInfo(file) {
        const fullFilePath = join(frontendDirectory, file);

        // valida se existe, se não existe estoura erro !!
        await access(fullFilePath);

        const fileType = extname(fullFilePath);

        return {
            type: fileType,
            name: fullFilePath,
        };
    }

    /**
     * @param {string} file
     * @returns {Promise<{stream: ReadStream, type: string}>} Promise<{stream: ReadStream, type: string}>
     */
    async getFileStream(file) {
        const { name, type } = await this.getFileInfo(file);

        return {
            stream: this.createFileStream(name),
            type,
        };
    }
}
