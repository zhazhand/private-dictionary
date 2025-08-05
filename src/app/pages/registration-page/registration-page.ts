import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RegistrationAndAuthenticationForm } from "app/shared/components/registration-and-authentication-form/registration-and-authentication-form";

@Component({
  selector: "app-registration-page",
  imports: [RegistrationAndAuthenticationForm],
  template: ` <div>
    <app-registration-and-authentication-form
      [formTitle]="formTitle"
      [passwordMinLength]="passwordMinLength"
      [passwordMaxLength]="passwordMaxLength"
      (formData)="onSubmit($event)"
    />
  </div>`,
  styleUrl: "./registration-page.less",
})
export class RegistrationPage {
  formTitle: string = "Registration";
  passwordMinLength: number = 6;
  passwordMaxLength: number = 12;

  onSubmit(data: FormGroup): void {
    console.log("data", data);
  }
}
