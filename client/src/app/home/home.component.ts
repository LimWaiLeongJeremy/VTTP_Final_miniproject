import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Item } from '../model/item';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private userAuthSvc: UserAuthService,
    private router: Router
  ) {}

  role!: any;
  products: Item[] = [];
  loading: boolean = true;
  responsiveOptions!: any[];

  ngOnInit(): void {
    this.userSvc.getItemLimited().subscribe((item: Item[]) => {
      this.products = item;
      this.loading = false;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.role = this.userAuthSvc.getRoles();
  }

  public routeToLogin() {
    if (Object.values(this.role).length === 0) {
      this.router.navigateByUrl('/login');
    } else if (this.role[0].role == 'Admin') {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/user');
    }
  }
}
