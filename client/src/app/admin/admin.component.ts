import { Component, IterableDiffers, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { UserService } from '../service/user.service';
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor( private userSvc: UserService, private filterService: FilterService ) { }
  
  items!: Item[];
  cols!: any[];
  matchModeOptions!: SelectItem[];
  
  ngOnInit(): void {

    const customFilterName = "custom-equals";

    this.filterService.register(
      customFilterName,
      (value: { toString: () => any; } | null | undefined, filter: string | null | undefined): boolean => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      }
      )
      this.cols = [
        { field: "itemName", header: "Item Name" },
        { field: "effect", header: "Effect" },
        { field: "price", header: "Price" },
        { field: "Quanti", header: "Vin" }
      ];
      
      this.matchModeOptions = [
        { label: "Custom Equals", value: customFilterName },
        { label: "Starts With", value: FilterMatchMode.STARTS_WITH },
        { label: "Contains", value: FilterMatchMode.CONTAINS }
      ];
      
      this.items = this.userSvc.getItem();
    // this.userSvc.getItem().then(items => (this.items = items))
    // this.carService.getCarsMedium().then(cars => (this.cars = cars));
  }
}

  


