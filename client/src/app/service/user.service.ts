import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { AuthResponse } from '../model/authResponse';
import { Roles } from '../model/roles';
import { Item } from '../model/item';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'true' });
  userName!: string;
  password!: string;
  items: Item[] = [
    {
      id: '1',
      itemName: 'Item 1',
      effect: 'Effect 1',
      img: 'img1.jpg',
      price: 10,
      quantity: '1',
    },
    {
      id: '2',
      itemName: 'Item 2',
      effect: 'Effect 2',
      img: 'img2.jpg',
      price: 20,
      quantity: '1',
    },
    {
      id: '3',
      itemName: 'Item 3',
      effect: 'Effect 3',
      img: 'img3.jpg',
      price: 30,
      quantity: '1',
    },
    {
      id: '4',
      itemName: 'Item 4',
      effect: 'Effect 4',
      img: 'img4.jpg',
      price: 40,
      quantity: '1',
    },
  ];
  API_URL = 'http://localhost:8080';
  token = this.userAuthSvc.getToken() || '';
  constructor(private http: HttpClient, private userAuthSvc: UserAuthService) {}

  public login(loginData: any) {
    this.userName = loginData.userName
    this.password = loginData.password
    return this.http.post<AuthResponse>(this.API_URL + '/api/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  // async getToken(loginData: any): Promise<AuthResponse> {
  //   const result = await firstValueFrom(
  //     this.http.post<AuthResponse>(
  //       this.API_URL + '/api/authenticate',
  //       loginData,
  //       {
  //         headers: this.requestHeader,
  //       }
  //     )
  //   );
  //   console.log(result)
  //   return result;
  // }

  public getItem() {
    return this.items;
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
