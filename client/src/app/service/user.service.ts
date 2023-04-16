import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { AuthResponse } from '../model/authResponse';
import { Roles } from '../model/roles';
import { Item } from '../model/item';
import { Observable, catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'true' });
  userName!: string;
  password!: string;
  items: Item[] = [];
  body = {} ;

  API_URL = 'http://localhost:8080';
  token = this.userAuthSvc.getToken() || '';
  constructor(private http: HttpClient, private userAuthSvc: UserAuthService) {}

  public login(loginData: any) {
    console.log('login');
    this.userName = loginData.userName;
    this.password = loginData.password;
    return this.http.post<AuthResponse>(
      '/api/authenticate',
      loginData,
      {
        headers: this.requestHeader,
      }
    );
  }

  public getItem() {
    return this.http.get<any>(`/api/items`);
  }

  public saveUserCart(items: Item[]) {
    console.log('save Cart ', items)
    return this.http.post<any>('/api/saveCart', items);
  }

  public updateItem(item: Item) {
    return this.http.put<any>(`/api/updateItem/${item.price}/${item.quantity}/${item.id}`, this.body);
  }

  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: Roles[] = this.userAuthSvc.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].role === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
