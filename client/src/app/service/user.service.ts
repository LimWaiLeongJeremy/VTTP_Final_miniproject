import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class UserService {
  BACKEND = 'http://localhost:8080'

  requestHeader = new HttpHeaders(
    { "No-Auth":"true"}
  )

  constructor(private http: HttpClient) { } 

  public login(loginData: any) {
    return this.http.post(this.BACKEND + "/authenticate" , loginData, {headers: this.requestHeader})
  }

}
