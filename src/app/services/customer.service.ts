import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Customer } from '../modules/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/clients';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) {}


  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.baseUrl)
      .pipe(map((response) => response as Customer[]));
  }

  getCustomersByKeuWord(search:string): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${this.baseUrl}?search=${search}`)
      .pipe(map((response) => response as Customer[]));
  }

  getCustomer(uid:string):Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/${uid}`);
  }


  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editeCustomer(customer: Customer):Observable<Customer>{
    return this.http.put<Customer>(`${this.baseUrl}/${customer.uid}`,customer).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  removeCustomer(id:string):Observable<Customer>{
    return this.http.delete<Customer>(`${this.baseUrl}/${id}`).pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
}
