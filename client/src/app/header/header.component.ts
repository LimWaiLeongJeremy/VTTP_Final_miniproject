import { Component, EventEmitter, Output,OnInit, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck{
  loggedIn: boolean = false;
  userRole: string | null = null;
  username = '';
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/home',
      title: 'Potter Potions~!',
    },
    {
      label: 'User',
      icon: 'pi pi-fw pi-home',
      routerLink: '/user',
      title: 'User',
      visible: this.userRole === "User"
    },
    {
      label: 'Admin',
      icon: 'pi pi-fw pi-home',
      routerLink: '/{admin}',
      title: 'admin',
      visible: this.userRole === "Admin"
    },
  ];
  @Output() eventEmitter = new EventEmitter();
// TODO: showing button by role
  constructor(
    private userAuthSvc: UserAuthService,
    public router: Router,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.username = storedName;
    }

    this.userAuthSvc.userName$.subscribe((name) => {
      this.username = name;
      console.log('name',name)
    });
  }

  ngDoCheck() {
    if (this.authenticated()) {
      this.userRole = this.role()
    }
  }

  public authenticated() {
    return this.userAuthSvc.authenticated();
  }

  public role() {
    return this.userAuthSvc.getRoles();
  }

  public loggedOut() {
    localStorage.clear();
    this.userRole = null
    this.router.navigateByUrl('/home');
  }

  public viewCart() {
    this.userSvc.emitShowCartEvent();
    console.log("header click")
    // this.eventEmitter.emit(true);
  }
}
