import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Item } from '../model/item';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  constructor(private userSvc: UserService) {}

  products: Item[] = []
  responsiveOptions!: any[];

  lat: number = 51.678418;
  lng: number = 7.809007;
  

  // TODO: click on item route to login if not auth else user page
  ngOnInit(): void {
    this.userSvc.getItem().subscribe((items: Item[])=> {
      this.products = items;
    }),
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
}
