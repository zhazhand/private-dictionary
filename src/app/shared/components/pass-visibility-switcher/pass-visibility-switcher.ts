import { Component, input, OnInit, output } from "@angular/core";

@Component({
  selector: "app-pass-visibility-switcher",
  imports: [],
  templateUrl: "./pass-visibility-switcher.html",
  styleUrl: "./pass-visibility-switcher.less",
})
export class PassVisibilitySwitcher implements OnInit {
  isPassVisible: boolean = false;
  openedEye: string = "assets/svg/eye.svg";
  crossedEye: string = "assets/svg/crossed-eye.svg";

  isDisabled = input<boolean>(false);
  passVisibilityState = output<boolean>();

  ngOnInit(): void {
    this.sendPassVisibilityState();
  }

  sendPassVisibilityState() {
    this.passVisibilityState.emit(this.isPassVisible);
  }

  switchPassVisibility() {
    this.isPassVisible = !this.isPassVisible;

    this.sendPassVisibilityState();
  }
}
