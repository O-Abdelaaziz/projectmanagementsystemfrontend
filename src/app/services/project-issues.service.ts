import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProjectIssues } from '../modules/project-issues';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectIssuesService {

  private baseUrl = 'http://localhost:8080/projectissues';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) {}

  getProjectIssueses(): Observable<ProjectIssues[]> {
    return this.http
      .get<ProjectIssues[]>(this.baseUrl)
      // .pipe(map((response) => response as Project[]));
  }

  getProjectIssuesesByKeuWord(search:string): Observable<ProjectIssues[]> {
    return this.http
      .get<ProjectIssues[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as ProjectIssues[]));
  }

  getProjectIssues(uid:string):Observable<ProjectIssues>{
    return this.http.get<ProjectIssues>(`${this.baseUrl}/${uid}`);
  }


  saveProjectIssues(projectIssues: ProjectIssues): Observable<ProjectIssues> {
    return this.http.post<ProjectIssues>(this.baseUrl, projectIssues).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeProjectIssues(Project: ProjectIssues):Observable<ProjectIssues>{
    return this.http.put<ProjectIssues>(`${this.baseUrl}/${Project.uid}`,Project).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeProjectIssues(id:string):Observable<ProjectIssues>{
    return this.http.delete<ProjectIssues>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
