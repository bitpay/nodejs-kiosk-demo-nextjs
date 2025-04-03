import { sseService } from "@/services/sse";

describe("SSE Service", () => {
  const service = sseService;

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Should send event", () => {
    const testCallback = {
      callback: () => {},
    };

    const writeSpy = jest.spyOn(testCallback, "callback");
    service.subscribe(testCallback.callback);

    service.addEvent("test");
    expect(writeSpy).toHaveBeenCalled();
  });
});
