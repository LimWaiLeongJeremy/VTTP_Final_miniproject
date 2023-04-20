import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent implements OnInit {

  
    constructor(private userSvc: UserService,   public router: Router ) {}

  ngOnInit(): void {

    this.userSvc.deleteUserCart().subscribe(delCart => { });
    this.userSvc.sendMail().subscribe( mail => { });
  }
  userRoute() {
    this.router.navigateByUrl('/user');
  }
}
