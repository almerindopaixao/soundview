import { jest, expect, describe, test, beforeEach } from "@jest/globals";
import config from "../../../backend/config.js";
import { Controller } from "../../../backend/controller.js";
import { handler } from "../../../backend/routes.js";
import TestUtil from "../_util/testUtil.js";
const { pages, location } = config;

describe("#Routes - test site for api response", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("GET / - should redirect to home page", async () => {
        const params = TestUtil.defaultHandleParams();
        params.request.method = "GET";
        params.request.url = "/";

        handler(...params.values());

        expect(params.response.writeHead).toBeCalledWith(302, {
            Location: location.home,
        });
        expect(params.response.end).toHaveBeenCalled();
    });

    test(`GET /home - should response with ${pages.homeHTML} file stream`, async () => {
        const params = TestUtil.defaultHandleParams();
        params.request.method = "GET";
        params.request.url = "/home";
        const mockFileStream = TestUtil.generateReadableStream(["data"]);

        jest.spyOn(
            Controller.prototype,
            Controller.prototype.getFileStream.name
        ).mockResolvedValue({
            stream: mockFileStream,
        });

        jest.spyOn(mockFileStream, "pipe").mockReturnValue();

        await handler(...params.values());

        expect(Controller.prototype.getFileStream).toBeCalledWith(
            pages.homeHTML
        );

        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response);
    });

    test.todo(
        `GET /controller - should response with ${pages.controllerHTML} file stream`
    );
    test.todo(`GET /file.ext - should response with file stream`);
    test.todo(
        `GET /unknown - given an inexistent route it should response with 404`
    );

    describe("exceptions", () => {
        test.todo("given inexistent file it should respond with 404");
        test.todo("given an error it should respond with 500");
    });

    test("my test", () => {
        expect(true).toBeTruthy();
    });
});
