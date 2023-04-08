import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../model/item';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview'



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  
  items: Item[] = [];
  token!: string;
  tokenSubscription!: Subscription;
  
  constructor(
    private userSvc: UserService,
    private userAuthSvc: UserAuthService
  ) {}

  ngOnInit(): void {
    console.log(this.userAuthSvc.getToken());
    this.userSvc.getItem().subscribe((items: Item[])=> {
      this.items = items;
      console.log(this.items) 
    })
    // if(!this.userAuthSvc.getToken() === null) {
    //   this.tokenSubscription = this.userAuthSvc
    //     .token$
    //     .subscribe((token) => {
    //       this.token = token;
    //       this.userSvc.getUserItem().subscribe(item => {
    //       this.items = item;
    //       console.log(this.items)
    //       });
    //     });
    // }
  }

  // ngOnDestroy() {
  //   this.tokenSubscription.unsubscribe();
  // }
  
}
