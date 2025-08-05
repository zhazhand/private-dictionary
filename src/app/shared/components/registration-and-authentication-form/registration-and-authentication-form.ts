import { Component, input, output, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { PassVisibilitySwitcher } from "app/shared/components/pass-visibility-switcher/pass-visibility-switcher";
import { validationErrorMessage } from "@constants/error-messages";

@Component({
  selector: "app-registration-and-authentication-form",
  imports: [PassVisibilitySwitcher, ReactiveFormsModule],
  templateUrl: "./registration-and-authentication-form.html",
  styleUrl: "./registration-and-authentication-form.less",
})
export class RegistrationAndAuthenticationForm implements OnInit {
  form!: FormGroup;
  isPassVisible!: boolean;
  errorMessage = validationErrorMessage;

  formTitle = input<string>("Form title");
  passwordMinLength = input<number>(8);
  passwordMaxLength = input<number>(12);
  formData = output<FormGroup>();

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.passwordMinLength()),
        Validators.maxLength(this.passwordMaxLength()),
      ]),
    });
  }

  setPassVisibility(value: boolean): void {
    this.isPassVisible = value;
  }

  submitForm(): void {
    this.form.disable();
    this.formData.emit(this.form);
  }
}
