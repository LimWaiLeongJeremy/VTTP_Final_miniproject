import { Component } from '@angular/core';
import { environment } from '../service/environment';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { StripeServiceService } from '../service/stripe-service.service';
import { UserService } from '../service/user.service';
import { Item } from '../model/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  constructor(
    private http: HttpClient,
    private stripeSvc: StripeServiceService,
    private userSvc: UserService,
    public router: Router
  ) {}

  secret!: string;
  itemSum: number = 0;
  cart: Item[] = [];
  stripePromise: any;
  loading: boolean = true;

  ngOnInit(): void {
    this.stripeSvc.getStripe().subscribe((ds) => {
      this.stripePromise = loadStripe(ds.message);
    });
    this.userSvc.getUserCart().subscribe((userCart) => {
      this.cart = userCart;
      this.sumOfCartItems();
      this.loading = false;
    });

    this.userSvc.getSaveCartEvent().subscribe((e) => {
      this.userSvc.getUserCart().subscribe((userCart) => {
        this.cart = userCart;
        console.info(e);
        this.sumOfCartItems();
        this.loading = false;
      });
    });
  }

  async pay(): Promise<void> {
    const stripe = await this.stripePromise;
    this.http
      .post(`${environment.serverUrl}/payment`, null)
      .subscribe((data: any) => {
        stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }

  sumOfCartItems() {
    this.itemSum = 0;
    this.itemSum = this.cart
      .map((c) => c.price * c.quantity)
      .reduce((a, b) => a + b, 0);
  }

  cancel() {
    this.router.navigateByUrl('/user');
  }
}
