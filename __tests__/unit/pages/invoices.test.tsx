import Invoices from "@/app/invoices/page";
import logger from "@/utils/logger";
import { render } from "@testing-library/react";
import EventSource from "eventsourcemock";
import { Logger } from "winston";

Object.defineProperty(window, "EventSource", {
  value: EventSource,
});

describe("Invoices Grid Page", () => {
  it("Should render properly", async () => {
    jest.spyOn(logger, "info").mockReturnValue({} as unknown as Logger);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    ) as jest.Mock;

    render(await Invoices({ searchParams: { page: "1", limit: "10" } }));
  });
});
