import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { AuthResponse } from '../model/authResponse';
import { Roles } from '../model/roles';
import { Item } from '../model/item';
import { Observable, Subject, catchError, firstValueFrom } from 'rxjs';
import { CheckOutComponent } from '../check-out/check-out.component';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endPoint = environment.serverUrl;
  requestHeader = new HttpHeaders({ 'No-Auth': 'true' });
  userName!: string;
  password!: string;
  items: Item[] = [];
  private cart: Item[] = [];
  body = {};
  private cartSubject = new Subject<any>();
  private saveCartSubject = new Subject<any>();

  token = this.userAuthSvc.getToken() || '';
  constructor(private http: HttpClient, private userAuthSvc: UserAuthService) {}

  public login(loginData: any) {
    this.userName = loginData.userName;
    this.password = loginData.password;
    return this.http.post<AuthResponse>(
      this.endPoint + '/authenticate',
      loginData,
      {
        headers: this.requestHeader,
      }
    );
  }

  public getItem() {
    return this.http.get<any>(this.endPoint + `/items`);
  }

  public getItemLimited() {
    return this.http.get<any>(
      this.endPoint + `/itemsLimited?limit=12&offset=35`
    );
  }

  emitShowCartEvent() {
    this.cartSubject.next(true);
  }

  getCartEvent() {
    return this.cartSubject.asObservable();
  }

  emitSaveCartEvent() {
    this.saveCartSubject.next(true);
  }

  getSaveCartEvent() {
    return this.saveCartSubject.asObservable();
  }

  public saveUserCart(items: Item[]) {
    const token = localStorage.getItem('token');
    localStorage.clear();
    const saveCartHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.endPoint + '/saveCart', items, {
      headers: saveCartHeader,
    });
  }

  public updateItem(item: Item) {
    return this.http.put<any>(
      this.endPoint + `/updateItem/${item.price}/${item.quantity}/${item.id}`,
      this.body
    );
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

  public getUserCart() {
    return this.http.get<any>(this.endPoint + `/userCart`);
  }

  public deleteUserCart() {
    return this.http.get<any>(this.endPoint + `/deleteCart`);
  }

  public sendMail() {
    return this.http.get<any>(this.endPoint + `/sendMail`);
  }
}
