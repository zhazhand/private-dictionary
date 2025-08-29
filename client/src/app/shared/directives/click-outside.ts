import { Directive, ElementRef, output, HostListener } from "@angular/core";

@Directive({
  selector: "[clickOutside]",
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}
  clickOutside = output<void>();

  @HostListener("document:click", ["$event"])
  public onClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
