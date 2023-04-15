import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Roles } from '../model/roles';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private token!: string;
  private tokenSubject = new Subject<string>();
  private usernameSubject = new Subject<string>();
  token$ = this.tokenSubject.asObservable();
  userName$ = this.usernameSubject.asObservable();
  
  constructor() {}


  public setRole(roles: Roles[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles() {
    return JSON.parse(localStorage.getItem('roles') || '');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
    console.log(jwtToken);
    this.token = jwtToken;
    this.tokenSubject.next(jwtToken);
  }

  getTokenObservable() {
    return this.tokenSubject.asObservable();
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  public setUserName(userName: string) {
    this.usernameSubject.next(userName);
    localStorage.setItem('userName', userName);
  }

  public getUserName() {
    console.log(localStorage.getItem('userName'))
    return localStorage.getItem('userName');

  }

  public clear() {
    localStorage.clear();
  }

  public authenticated() {
    const token = localStorage.getItem('jwtToken');
    return this.getToken() && this.getRoles();
  }
}
