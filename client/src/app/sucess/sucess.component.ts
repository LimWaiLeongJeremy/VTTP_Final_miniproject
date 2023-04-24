import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css'],
})
export class SucessComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private userAuthSvc: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSvc.deleteUserCart().subscribe((delCart) => {});
    this.userSvc.sendMail().subscribe((mail) => {});
  }
  userRoute() {
    this.router.navigateByUrl('/user');
  }
}
