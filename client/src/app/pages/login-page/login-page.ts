import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PageTitle, QueryParams, routePath } from "@constants/constants";
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
export class LoginPage implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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
        console.log("Теперь вы можете зайти в систему, используя свои данные"); //should be reworked
        this.goToIrregular();
      } else if (params[QueryParams.accessDenied]) {
        console.log("Для начала авторизуйтесь в системе"); //should be reworked
      } else if (params[QueryParams.sessionFailed]) {
        console.log("Пожалуйста, войдите в систему заново"); //should be reworked
      }
    });
  }

  onSubmit(): void {
    this.authenticationForm.form.disable();
    this.aSub = this.auth.login(this.authenticationForm.form.value).subscribe({
      next: () => {
        this.goToIrregular();
      },
      error: (error) => {
        console.info(error);
        this.authenticationForm.form.enable();
      },
    });
  }

  goToIrregular(): void {
    this.router.navigate([`/${routePath.irregular}`]);
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
