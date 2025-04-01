import handler from "@/app/invoices/page";
import logger from "@/utils/logger";
import { Logger } from "winston";

describe("/api/invoices", () => {
  it("Should return invoices", async () => {
    jest.spyOn(logger, "info").mockReturnValue({} as unknown as Logger);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { test: true } }),
      })
    ) as jest.Mock;

    await handler({ searchParams: Promise.resolve({}) });
  });
});
