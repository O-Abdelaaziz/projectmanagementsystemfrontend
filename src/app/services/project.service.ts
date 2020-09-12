import { Injectable } from '@angular/core';
import { Project } from '../modules/project';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/projects';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.baseUrl)
      .pipe(map((response) => response as Project[]));
  }

  getProjectsByKeuWord(search:string): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as Project[]));
  }

  getProject(uid:string):Observable<Project>{
    return this.http.get<Project>(`${this.baseUrl}/${uid}`);
  }


  saveProject(Project: Project): Observable<Project> {    
    return this.http.post<Project>(this.baseUrl, Project).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeProject(Project: Project):Observable<Project>{
    return this.http.put<Project>(`${this.baseUrl}/${Project.uid}`,Project).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeProject(id:string):Observable<Project>{
    return this.http.delete<Project>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
