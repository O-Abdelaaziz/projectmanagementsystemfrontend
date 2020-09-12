import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Notice } from '../modules/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private baseUrl = 'http://localhost:8080/notices';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) {}

  getNotices(): Observable<Notice[]> {
    return this.http
      .get<Notice[]>(this.baseUrl)
      // .pipe(map((response) => response as Notice[]));
  }

  getNoticesByKeuWord(search:string): Observable<Notice[]> {
    return this.http
      .get<Notice[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as Notice[]));
  }

  getNotice(uid:string):Observable<Notice>{
    return this.http.get<Notice>(`${this.baseUrl}/${uid}`);
  }


  saveNotice(notice: Notice): Observable<Notice> {
    console.log("from service " +notice);
    
    return this.http.post<Notice>(this.baseUrl, notice).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeNotice(notice: Notice):Observable<Notice>{
    return this.http.put<Notice>(`${this.baseUrl}/${notice.uid}`,notice).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeNotice(id:string):Observable<Notice>{
    return this.http.delete<Notice>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
