import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "@interfaces/user";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string | null = null;
  private user: User | null = null;
  private tokenName: string = "auth-token";
  private authenticationState = new BehaviorSubject<boolean>(
    this.isAuthenticated(),
  );

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    this.user = user;
    return this.http.post<User>("/api/auth/register", user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("/api/auth/login", user).pipe(
      tap(({ token }) => {
        this.setToken(token);
        this.token = token;
        this.authenticationState.next(this.isAuthenticated());
      }),
    );
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = this.getTokenFromCookie();
    }
    return this.token;
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthenticationState(): Observable<boolean> {
    return this.authenticationState.asObservable();
  }

  private getTokenFromCookie(): string | null {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          this.tokenName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)",
      ),
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  private setToken(
    value: string,
    maxAge: number = 3600,
    tokenName: string = this.tokenName,
  ): void {
    document.cookie = `${encodeURIComponent(tokenName)}=${encodeURIComponent(value)};max-age=${maxAge}`;
  }

  logOut() {
    this.token = null;
    this.setToken("", -1);
    this.authenticationState.next(this.isAuthenticated());
  }
}
