import handler from "@/app/invoices/[id]/page";
import logger from "@/utils/logger";
import { Logger } from "winston";

describe("/api/invoices/[id]", () => {
  it("Should return invoice", async () => {
    jest.spyOn(logger, "info").mockReturnValue({} as unknown as Logger);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { test: true } }),
      })
    ) as jest.Mock;

    await handler({ params: Promise.resolve({ id: "1" }) });
  });
});
