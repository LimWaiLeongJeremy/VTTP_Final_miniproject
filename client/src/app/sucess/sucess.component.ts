import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent implements OnInit {

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    // TODO: clear user cart
    this.userSvc.deleteUserCart().subscribe(delCart => { });
    this.userSvc.sendMail().subscribe( mail => { });
  }

}
