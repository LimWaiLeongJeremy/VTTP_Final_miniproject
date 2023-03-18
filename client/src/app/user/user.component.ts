import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  items: Item[] = []
  constructor( private userSvc: UserService, private userAuthSvc: UserAuthService) {}
  
  ngOnInit(): void {
    this.items = this.userSvc.getItem();
      // this.userSvc.getItem(role[0])
  }

}
