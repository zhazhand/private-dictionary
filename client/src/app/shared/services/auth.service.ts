import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "@interfaces/user";

@Injectable({ providedIn: "root" })
export class AuthService {
  token: string | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}
  register(user: User): Observable<User> {
    return this.http.post<User>("/api/auth/register", user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("/api/auth/login", user).pipe(
      tap(({ token }) => {
        this.cookieService.set("auth-token", token);
        this.token = token;
      }),
    );
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = this.cookieService.get("auth-token");
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logOut() {
    this.token = null;
    this.cookieService.delete("auth-token");
  }
}
