import { Injectable } from '@angular/core';
import { Roles } from '../model/roles';


@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRole(roles: Roles[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(){
    return JSON.parse(localStorage.getItem('roles') || '');
  
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  public setUserName(userName: string) {
    localStorage.setItem('userName', userName)
  }

  public getUserName() {
    return localStorage.getItem('userName')
  }

  public setPassword(password: string) {
    localStorage.setItem('password', password)
  }

  public getPassword() {
    return localStorage.getItem('password')
  }

  public clear() {
    localStorage.clear()
  }

  public authenticated() {
    const token = localStorage.getItem('jwtToken')
    return this.getToken() && this.getRoles() ;
  }
}
