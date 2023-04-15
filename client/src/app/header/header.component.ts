import { Component} from '@angular/core';
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
  // username: any = this.userAuthSvc.getUserName();
  username = '';

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
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.username = storedName;
    }

    this.userAuthSvc.userName$.subscribe((name) => {
      this.username = name;
      console.log('name',name)
    });
  }

  public authenticated() {
    return this.userAuthSvc.authenticated();
  }

  public loggedOut() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }
}
