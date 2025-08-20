import { Component, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PageTitle, routePath, ToastClassName } from "@constants/constants";
import { AuthService } from "@services/auth.service";
import { ToastService } from "@services/toast.service";
import { RegistrationAndAuthenticationForm } from "app/shared/components/registration-and-authentication-form/registration-and-authentication-form";
import { Subscription } from "rxjs";

@Component({
  selector: "app-registration-page",
  imports: [RegistrationAndAuthenticationForm],
  template: ` <div>
    <app-registration-and-authentication-form
      [formTitle]="formTitle"
      [passwordMinLength]="passwordMinLength"
      [passwordMaxLength]="passwordMaxLength"
      (formData)="onSubmit()"
    />
  </div>`,
  styleUrl: "./registration-page.less",
})
export class RegistrationPage implements OnDestroy {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  @ViewChild(RegistrationAndAuthenticationForm)
  registrationForm!: RegistrationAndAuthenticationForm;

  aSub: Subscription | null = null;
  formTitle: string = PageTitle.registration;
  passwordMinLength: number = 6;
  passwordMaxLength: number = 12;

  onSubmit(): void {
    this.registrationForm.form.disable();
    this.aSub = this.auth.register(this.registrationForm.form.value).subscribe({
      next: () => {
        this.router.navigate([`/${routePath.login}`], {
          queryParams: {
            registered: true,
          },
        });
      },
      error: (resp) => {
        this.toastService.show({
          text: resp.error.message,
          className: ToastClassName.error,
        });
        this.registrationForm.form.enable();
      },
    });
  }

  ngOnDestroy() {
    this.toastService.clear();
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
