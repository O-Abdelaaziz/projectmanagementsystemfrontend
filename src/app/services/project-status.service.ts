import { Injectable } from '@angular/core';
import { ProjectStatus } from '../modules/project-status';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {

  private baseUrl = 'http://localhost:8080/statuses';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) {}

  getProjectStatuses(): Observable<ProjectStatus[]> {
    return this.http
      .get<ProjectStatus[]>(this.baseUrl)
      // .pipe(map((response) => response as Project[]));
  }

  getProjectStatusesByKeuWord(search:string): Observable<ProjectStatus[]> {
    return this.http
      .get<ProjectStatus[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as ProjectStatus[]));
  }

  getProjectStatus(uid:string):Observable<ProjectStatus>{
    return this.http.get<ProjectStatus>(`${this.baseUrl}/${uid}`);
  }


  saveProjectStatus(Project: ProjectStatus): Observable<ProjectStatus> {    
    return this.http.post<ProjectStatus>(this.baseUrl, Project).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeProjectStatus(Project: ProjectStatus):Observable<ProjectStatus>{
    return this.http.put<ProjectStatus>(`${this.baseUrl}/${Project.uid}`,Project).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeProjectStatus(id:string):Observable<ProjectStatus>{
    return this.http.delete<ProjectStatus>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
