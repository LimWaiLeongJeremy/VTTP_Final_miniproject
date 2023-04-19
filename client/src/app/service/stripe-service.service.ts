import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeServiceService {
  secret!: string;
  constructor(private http: HttpClient) { }

  public getStripe(){
    return this.http.get<any>(`/api/getStripe`).subscribe(
      (response) => {
        const message = response.message;
        console.log(message); // prints "something"
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
