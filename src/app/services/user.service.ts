import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../modules/user';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users';
  
  
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseUrl)
      .pipe(map((response) => response as User[]));
  }

  getUsersByKeuWord(search: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as User[]));
  }

  getUser(uid: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${uid}`);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.uid}`, user).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
