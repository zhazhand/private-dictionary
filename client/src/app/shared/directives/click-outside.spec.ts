import { ClickOutsideDirective } from "./click-outside";

describe("ClickOutsideDirective", () => {
  it("should create an instance", () => {
    const mockElementRef = {
      nativeElement: jasmine.createSpyObj("nativeElement", ["style"]),
    };
    const directive = new ClickOutsideDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
