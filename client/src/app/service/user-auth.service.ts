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
  private roleChange = new Subject<any>();

  public setRole(roles: Roles[]) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles() {
    let role;
    try {
      const roleString = sessionStorage.getItem('roles') || '{}';
      role = JSON.parse(roleString);
    } catch (error) {
      console.info(error);
    }
    return role;
  }

  emitRoleChange(role: any) {
    this.roleChange.next(role);
  }

  getNewRole() {
    return this.roleChange.asObservable();
  }

  public setToken(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken);
    this.token = jwtToken;
    this.tokenSubject.next(jwtToken);
  }

  getTokenObservable() {
    return this.tokenSubject.asObservable();
  }

  public getToken() {
    return sessionStorage.getItem('jwtToken');
  }

  public setUserName(userName: string) {
    this.usernameSubject.next(userName);
    sessionStorage.setItem('userName', userName);
  }

  public getUserName() {
    return sessionStorage.getItem('userName');
  }

  public clear() {
    sessionStorage.clear();
  }

  public authenticated() {
    const token = sessionStorage.getItem('jwtToken');
    return this.getToken() && this.getRoles();
  }
}
