import { Component, EventEmitter, Output,OnInit, DoCheck } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  loggedIn: boolean = false;
  showButton = false;
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
      label: 'About Us',
      icon: 'pi pi-moon',
      routerLink: '/about',
      title: 'Find us!'
}
  ];
  @Output() eventEmitter = new EventEmitter();

  constructor(
    private userAuthSvc: UserAuthService,
    public router: Router,
    private userSvc: UserService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showButton = this.router.url.includes('checkOut');
      }
    })
  }

  ngOnInit() {
    const storedName = this.userAuthSvc.getUserName();
    if (storedName) {
      this.username = storedName;
    }

    this.userAuthSvc.userName$.subscribe((name) => {
      this.username = name;
      console.log('name',name)
    });
    this.userAuthSvc.getNewRole().subscribe(newRole => {
      console.log(newRole)
      this.userRole = newRole;

      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          routerLink: '/home',
          title: 'Potter Potions~!',
        },
        {
          label: 'Shop',
          icon: 'pi pi-shopping-bag',
          routerLink: '/user',
          title: 'User',
          visible: newRole === "User" || this.userRole === "User"
        },
        {
          label: 'Dashboard',
          icon: 'pi pi-cog',
          routerLink: '/admin',
          title: 'admin',
          visible: newRole === "Admin" || this.userRole === "Admin"
        },
        {
          label: 'About Us',
          icon: 'pi pi-moon',
          routerLink: '/about',
          title: 'Find us!'
        }
      ];
    })
  }
  
  public authenticated() {
    this.userRole = this.role();
    return this.userAuthSvc.authenticated();
  }

  public role() {
    return this.userAuthSvc.getRoles();
  }

  public isUser() {
    return this.userAuthSvc.getRoles() == "User";
  }

  public loggedOut() {
    this.userAuthSvc.clear();
    this.userRole = null
    this.userAuthSvc.emitRoleChange(null);
    this.router.navigateByUrl('/home');
  }

  public viewCart() {
    this.userSvc.emitShowCartEvent();
    console.log("header click")
    // this.eventEmitter.emit(true);
  }

}
