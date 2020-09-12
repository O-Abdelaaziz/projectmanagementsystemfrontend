import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Task } from '../modules/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/tasks';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.baseUrl)
      .pipe(map((response) => response as Task[]));
  }

  getTasksByKeuWord(search:string): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as Task[]));
  }

  getTask(uid:string):Observable<Task>{
    return this.http.get<Task>(`${this.baseUrl}/${uid}`);
  }


  saveTask(Task: Task): Observable<Task> {
    console.log("from service " +Task);
    
    return this.http.post<Task>(this.baseUrl, Task).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeTask(Task: Task):Observable<Task>{
    return this.http.put<Task>(`${this.baseUrl}/${Task.uid}`,Task).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeTask(id:string):Observable<Task>{
    return this.http.delete<Task>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
