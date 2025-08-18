import { Component, input, output } from "@angular/core";
import { standardProposition } from "@constants/constants";
import { LoaderComponent } from "@reusable/loader/loader.component";

@Component({
  selector: "app-empty-list-block",
  imports: [LoaderComponent],
  templateUrl: "./empty-list-block.html",
  styleUrl: "./empty-list-block.less",
})
export class EmptyListBlock {
  hideLoader = input<boolean>();
  downloadDefault = output<void>();
  standardProposition: string = standardProposition;

  downloadDefaultList(): void {
    this.downloadDefault.emit();
  }
}
