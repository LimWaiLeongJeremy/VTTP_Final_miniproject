import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRole(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(){
    return JSON.parse(localStorage.getItem('roles') || '[]');
  
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear()
  }

  public authenticated() {
    const token = localStorage.getItem('jwtToken')
    return this.getToken() && this.getRoles() ;
  }
}
