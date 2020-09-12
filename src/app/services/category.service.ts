import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../modules/category';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/categories';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.baseUrl)
      .pipe(map((response) => response as Category[]));
  }

  getCategoriesByKeuWord(search:string): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as Category[]));
  }

  getCategory(uid:string):Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/${uid}`);
  }


  saveCategory(category: Category): Observable<Category> {    
    return this.http.post<Category>(this.baseUrl, category).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeCategory(category: Category):Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}/${category.uid}`,category).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeCategory(id:string):Observable<Category>{
    return this.http.delete<Category>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
