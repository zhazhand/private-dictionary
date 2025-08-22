import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { routePath } from "@constants/constants";
import { AuthService } from "@services/auth.service";
import { catchError, Observable, throwError } from "rxjs";

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const token = inject(AuthService).getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => handleAuthError(error)),
  );
};

const handleAuthError = (error: HttpErrorResponse): Observable<any> => {
  if (error.status === 401) {
    inject(Router).navigate([`/${routePath.login}`], {
      queryParams: {
        sessionFailed: true,
      },
    });
  }
  return throwError(() => error);
};
