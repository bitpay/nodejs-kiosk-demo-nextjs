/**
 * @jest-environment node
 */

import { POST as handler } from "@/app/api/invoices/webhooks/route";
import logger from "@/utils/logger";
import { NextRequest } from "next/server";
import { Logger } from "winston";

jest.mock("next/headers", () => ({
  headers: () => {
    return {
      get: () => "test",
    };
  },
}));

describe("/api/invoices/webhooks", () => {
  it("Should retrieve webhook", async () => {
    const loggerInfoSpy = jest
      .spyOn(logger, "info")
      .mockReturnValue({} as unknown as Logger);
    jest.spyOn(logger, "error").mockReturnValue({} as unknown as Logger);

    const req: NextRequest = {
      method: "POST",
      body: {},
      headers: {},
      json: async () => ({ name: "Item 3" }),
    } as NextRequest;

    await handler(req);

    expect(loggerInfoSpy).toHaveBeenCalled();
  });
});
