import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  PageTitle,
  QueryParams,
  routePath,
  ToastClassName,
} from "@constants/constants";
import { toastMessage } from "@constants/toast-messages";
import { RegistrationAndAuthenticationForm } from "@reusable/registration-and-authentication-form/registration-and-authentication-form";
import { AuthService } from "@services/auth.service";
import { ToastService } from "@services/toast.service";
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
export class LoginPage implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
  ) {}

  @ViewChild(RegistrationAndAuthenticationForm)
  authenticationForm!: RegistrationAndAuthenticationForm;

  aSub: Subscription | null = null;
  formTitle: string = PageTitle.login;
  passwordMinLength: number = 6;
  passwordMaxLength: number = 12;

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params[QueryParams.registered]) {
        this.toastService.show({
          text: toastMessage.success.registration,
          className: ToastClassName.success,
          delay: 12,
          optionalText: toastMessage.success.quickJump,
          cb: this.goToIrregular.bind(this),
        });
      } else if (params[QueryParams.accessDenied]) {
        this.toastService.show({
          text: toastMessage.warning.accessDenied,
          className: ToastClassName.warning,
        });
      } else if (params[QueryParams.sessionFailed]) {
        this.toastService.show({
          text: toastMessage.info.sessionFailed,
          className: ToastClassName.info,
        });
      }
    });
  }

  onSubmit(): void {
    this.authenticationForm.form.disable();
    this.aSub = this.auth.login(this.authenticationForm.form.value).subscribe({
      next: () => {
        this.goToIrregular();
      },
      error: (resp) => {
        this.toastService.show({
          text: resp.error.message || resp.statusText || resp,
          className: ToastClassName.error,
        });
        this.authenticationForm.form.enable();
      },
    });
  }

  goToIrregular(): void {
    this.router.navigate([`/${routePath.irregular}`]);
  }

  ngOnDestroy() {
    this.toastService.clear();
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
