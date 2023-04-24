import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../model/item';
import { UserService } from '../service/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService],
})
export class UserComponent implements OnInit {
  items: Item[] = [];
  cart: Item[] = [];
  token!: string;
  tokenSubscription!: Subscription;
  isMaxStock: boolean = false;
  sidebarVisible: boolean = false;
  itemSum: number = 0;
  loading: boolean = true;

  sortOptions: any[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];
  sortOrder!: number;
  sortField!: string;

  cartCols = [
    { field: 'itemName', header: 'Potion', size: '20%' },
    { field: 'effect', header: 'Effect', size: '40%' },
    { field: 'price', header: 'Price', size: '15%' },
    { field: 'quantity', header: 'Quantity', size: '15%' },
  ];

  constructor(
    private userSvc: UserService,
    private messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userSvc.getItem().subscribe((items: Item[]) => {
      this.items = items;
      this.loading = false;
    });

    this.userSvc.getCartEvent().subscribe((show) => {
      this.sidebarVisible = show;
    });
    this.userSvc.getUserCart().subscribe((userCart) => {
      this.cart = userCart;
      this.sumOfCartItems();
    });
  }

  public addToCart(item: Item) {
    if (this.cart.filter((c) => c.id == item.id).length == 0) {
      const itemCopy: typeof item = { ...item };
      itemCopy.quantity = 1;
      this.cart.push(itemCopy);
      this.showSuccessAddToast(item.itemName);
    } else {
      this.cart.forEach((i) => {
        if (i.id == item.id) {
          if (i.quantity < item.quantity) {
            i.quantity += 1;
            this.showSuccessAddToast(item.itemName);
          } else {
            i.quantity = item.quantity;
            this.messageService.add({
              key: 'userToast',
              severity: 'error',
              summary: 'Out Of Stock',
              detail: 'You have added the max quantity in stock.',
            });
          }
        }
      });
    }
    this.sumOfCartItems();
  }

  public showSuccessAddToast(name: string) {
    this.messageService.add({
      key: 'userToast',
      severity: 'success',
      summary: 'Item Added!',
      detail: 'You have added ' + name + ' to your cart.',
    });
  }

  public deleteFromCart(item: Item) {
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == item.id) {
        this.cart.splice(i, 1);
      }
    }
    this.sumOfCartItems();
  }

  public checkIfAddDisabled(item: Item) {
    let disabled = false;
    this.cart.forEach((i) => {
      if (i.id == item.id) {
        if (i.quantity >= item.quantity) {
          disabled = true;
        }
      }
    });
    return disabled;
  }

  onCheckOut() {
    this.router.navigateByUrl('/checkOut');
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  sumOfCartItems() {
    this.itemSum = 0;
    this.itemSum = this.cart
      .map((c) => c.price * c.quantity)
      .reduce((a, b) => a + b, 0);
  }

  ngOnDestroy() {
    this.userSvc.saveUserCart(this.cart).subscribe((a) => {
      this.userSvc.emitSaveCartEvent();
    });
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
