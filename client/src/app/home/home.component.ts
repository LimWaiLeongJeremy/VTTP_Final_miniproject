import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Item } from '../model/item';
// import { Loader } from '@googlemaps/js-api-loader';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  constructor(private userSvc: UserService, private userAuthSvc: UserAuthService, private router: Router ) {}

  role!: string
  products: Item[] = []
  loading: boolean = true;
  responsiveOptions!: any[];

  lat: number = 51.678418;
  lng: number = 7.809007;
  
  ngOnInit(): void {
    this.userSvc.getItem().subscribe((item : Item[]) =>{
      this.products = item;
      this.loading = false;
    })

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
        }
      ];
    }

    public routeToLogin() {
      this.router.navigateByUrl('/user');
    }
}
