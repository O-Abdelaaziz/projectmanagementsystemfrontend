import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../modules/user-profile';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  private baseUrl = 'http://localhost:8080/userprofile';
  public host :string = "http://localhost:8080";
  formData: FormData = new FormData();

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) {}

  getUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.baseUrl);
    // .pipe(map((response) => response as UserProfile[]));
  }

  getUserProfileImage(uid: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',     
    });
    return this.http.get(`${this.baseUrl}/imageuserprofile/${uid}`, {headers: headers, responseType: 'blob' as 'json' });
  }

  getUserProfilesByKeuWord(search: string): Observable<UserProfile[]> {
    return this.http
      .get<UserProfile[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as UserProfile[]));
  }

  getUserProfile(uid: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/${uid}`);
  }

  saveUserProfile(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeUserProfile(formData: FormData,uid:string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${uid}`, formData).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeUserProfile(id: string): Observable<UserProfile> {
    return this.http.delete<UserProfile>(`${this.baseUrl}/${id}`);
  }
}
