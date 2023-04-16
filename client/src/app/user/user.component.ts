import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../model/item';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview'
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  
  items: Item[] = [];
  cart: Item[] = [];
  token!: string;
  tokenSubscription!: Subscription;
  isMaxStock: boolean = false;
  
  //DataView Variables
    sortOptions: any[] = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];
    sortOrder!: number;
    sortField!: string;


  constructor(
    private userSvc: UserService,
    private userAuthSvc: UserAuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log(this.userAuthSvc.getToken());
    this.userSvc.getItem().subscribe((items: Item[])=> {
      this.items = items;
    })
  }
  
  public addToCart(item: Item) {
    console.log("Item ", item , this.cart)
    if(this.cart.filter(c => c.id == item.id).length == 0){
      const itemCopy: typeof item = {... item};
      itemCopy.quantity = 1;
      this.cart.push(itemCopy);
    } else{
      this.cart.forEach(i => {
        if(i.id == item.id){
          if(i.quantity < item.quantity){
            i.quantity += 1;
          } else{
            
            i.quantity = item.quantity;
            this.messageService.add({
              key: 'userToast',
              severity: 'error',
              summary: 'Out Of Stock',
              detail:
              'You have added the max quantity in stock.',
            })
          }
          
        }
      })
    }
    this.userSvc.saveUserCart(this.cart).subscribe( a =>{
      console.log(a)
    })
    console.info("cart saved")
  }

  public checkIfAddDisabled(item: Item){
    let disabled = false;
    this.cart.forEach(i => {
      if(i.id == item.id){
        if(i.quantity >= item.quantity){
          disabled = true;
        }
      }
    })
    return disabled;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
  

  ngOnDestroy() {
    console.log("user page destroied")
  }

}
