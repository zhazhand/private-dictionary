import { UpperCasePipe } from "@angular/common";
import { Component, input, OnInit, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-toggle-switcher",
  imports: [FormsModule, UpperCasePipe],
  templateUrl: "./toggle-switcher.html",
  styleUrl: "./toggle-switcher.less",
})
export class ToggleSwitcher implements OnInit {
  val1 = input<string>("Val1");
  val2 = input<string>("Val2");
  selectedValue!: string;
  takenValue = output<string>();

  ngOnInit() {
    this.selectedValue = this.val2();
  }

  onChange(model: string): void {
    this.selectedValue = model;
    this.takenValue.emit(model);
  }
}
