import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "@interfaces/user";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token: string | null = null;

  constructor(private http:HttpClient) {

  }
  register(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{token: string}>{
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
              localStorage.setItem('auth-token', token);
              this.setToken(token)
          }
        )
      )
  }
  setToken(token: string | null) {
    this.token = token
  }

  getToken(): string | null {
    return this.token
  }

  ///Проверяет находится-ли сейчас пользователь в сессии (проверяет есть-ли у него токен)
  isAuthenticated(): boolean {
    return !!this.token
  }

  ///Выход из системы
  logOut() {
    this.setToken(null);
    localStorage.clear();
  }

}