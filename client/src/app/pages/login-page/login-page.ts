import { Component, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RegistrationAndAuthenticationForm } from "@reusable/registration-and-authentication-form/registration-and-authentication-form";
import { AuthService } from "@services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login-page",
  imports: [RegistrationAndAuthenticationForm],
  template: ` <div>
    <app-registration-and-authentication-form
      [formTitle]="formTitle"
      [passwordMinLength]="passwordMinLength"
      [passwordMaxLength]="passwordMaxLength"
      (formData)="onSubmit()"
    />
  </div>`,
  styleUrl: "./login-page.less",
})
export class LoginPage implements OnDestroy {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  @ViewChild(RegistrationAndAuthenticationForm)
  authenticationForm!: RegistrationAndAuthenticationForm;

  aSub: Subscription | null = null;
  formTitle: string = "Login";
  passwordMinLength: number = 6;
  passwordMaxLength: number = 12;

  onSubmit(): void {
    this.authenticationForm.form.disable();
    this.aSub = this.auth.login(this.authenticationForm.form.value).subscribe({
      next: (value) => {
        this.router.navigate(["/irregular"]);
      },
      error: (error) => {
        console.info(error);
        this.authenticationForm.form.enable();
      },
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
