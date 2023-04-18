import { Component, OnInit } from '@angular/core';
import { emvironment } from '../service/environment';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  stripePromise = loadStripe(emvironment.stripe);
  constructor(private http: HttpClient) {}

  async pay(): Promise<void> {
    
    const paymentOrderItem = {
      id: '058f70c9-6d90-4b0b-a7e3-e504efaf3eae',
      itemName: 'Mopsus Potion',
      effect: 'string',
      image: 'string',
      price: '3204',
      quntity: 1,
    };

    const stripe = await this.stripePromise;
    this.http
      .post(`${emvironment.serverUrl}/payment`, paymentOrderItem)
      .subscribe((data: any) => {
        stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }

}
