import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class StripeServiceService {
  endPoint = environment.serverUrl;
  secret!: string;
  constructor(private http: HttpClient) {}

  public getStripe() {
    return this.http.get<any>(this.endPoint + `/api/getStripe`);
  }
}
