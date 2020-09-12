import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(data:{email:string,password:string}){

    return this.http.post("http://localhost:8080/users/login",data);
  }

  register(data:{username:string,email:string,password:string}){

    return this.http.post("http://localhost:8080/users",data,httpOptions);
  }
}
