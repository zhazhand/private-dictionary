import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "@services/auth.service";
import { routePath } from "@constants/constants";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService: AuthService = inject(AuthService);

  return (
    authService.isAuthenticated() ||
    inject(Router).createUrlTree([`/${routePath.login}`], {
      queryParams: {
        accessDenied: true,
      },
    })
  );
};
