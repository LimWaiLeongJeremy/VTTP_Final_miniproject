import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  items!: MenuItem[];
  loggedIn: boolean = false;

  ngOnInit() {
      this.items = [
          {
              label:'Home',
              icon:'pi pi-fw pi-home',
              routerLink: '/home',
              title: 'Potter Potions~!'     
          },
          {
              label:'Shop',
              icon:'pi pi-fw pi-pencil',
              routerLink: '/user'  
          },
          {
              label:'Admin',
              icon:'pi pi-fw pi-user',
              routerLink: '/admin'  
          }, 
      ];
  }
}
