import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { AuthResponse } from '../model/authResponse';
import { Roles } from '../model/roles';
import { Item } from '../model/item';
import { Observable, Subject, catchError, firstValueFrom } from 'rxjs';
import { CheckOutComponent } from '../check-out/check-out.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'true' });
  userName!: string;
  password!: string;
  items: Item[] = [];
  private cart: Item[] = [];
  body = {} ;
  private cartSubject = new Subject<any>();
  // saveCartHeader = new HttpHeaders();

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

  emitShowCartEvent(){
    this.cartSubject.next(true);
  }

  getCartEvent() {
    return this.cartSubject.asObservable();
  }

  public saveUserCart(items: Item[]){
    console.log('save Cart ', items)
    const token = sessionStorage.getItem('token');
    const saveCartHeader = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>('/api/saveCart', items, {headers: saveCartHeader});
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

  public getUserCart(){
    return this.http.get<any>(`/api/userCart`);
  }

  public deleteUserCart() {
    console.log("delete")

    return this.http.get<any>(`/api/deleteCart`)
  }

  public sendMail() {
    console.log("mail")

    return this.http.get<any>(`/api/sendMail`)
  }
}
