import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  items!: MenuItem[];
  loggedIn: boolean = false;

  constructor(
    private userAuthSvc: UserAuthService,
    private router: Router,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home',
        title: 'Potter Potions~!',
      },
    ];
  }

  public authenticated() {
    return this.userAuthSvc.authenticated();
  }

  public loggedOut() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }
}
