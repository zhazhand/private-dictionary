import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserInfoService {

    private subject = new ReplaySubject<any>(1);

    sendUserInfo(userInfo: any): void {
        this.subject.next(userInfo);
    }

    clearUserInfo(): void {
        this.subject.next(null);
    }

    getUserInfo(): Observable<any> {
        return this.subject.asObservable();
    }
}
