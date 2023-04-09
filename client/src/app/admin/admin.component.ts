import { Component, IterableDiffers, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { UserService } from '../service/user.service';
import {
  SelectItem,
  FilterService,
  FilterMatchMode,
  MessageService,
} from 'primeng/api';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MessageService]
})
export class AdminComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private userAuthSvc: UserAuthService,
    private filterService: FilterService,
    private messageService: MessageService
  ) {}

  items!: Item[];
  cols!: any[];
  matchModeOptions!: SelectItem[];
  clonedItems: { [s: string]: Item } = {};

  ngOnInit(): void {
    console.log(this.userAuthSvc.getToken());
    this.userSvc.getItem().subscribe((items: Item[]) => {
      this.items = items;
      console.log(this.items);
    });

    const customFilterName = 'custom-equals';

    this.filterService.register(
      customFilterName,
      (
        value: { toString: () => any } | null | undefined,
        filter: string | null | undefined
      ): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      }
    );
    this.cols = [
      { field: 'itemName', header: 'Item Name' },
      { field: 'effect', header: 'Effect' },
      { field: 'price', header: 'Price' },
      { field: 'quantity', header: 'Quantity' },
    ];

    this.matchModeOptions = [
      { label: 'Custom Equals', value: customFilterName },
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS },
    ];
  }

  onRowEditInit(item: Item) {
    this.clonedItems[item.itemName] = { ...item };
  }

  onRowEditSave(item: Item) {
    if (item.price > 0) {
      delete this.clonedItems[item.itemName];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Item is updated',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Price',
      });
    }

    // Send to API the item to update based on item ID
    // If API save returns status 200/ OK then :
    //      delete this.clonedItems[item.itemName];
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item is updated' });
    // ELSE if API save fails :
    //      this.item[index] = this.clonedItems[item.itemName];
    //      delete this.clonedItems[item.itemName];
    //      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Price Update failed' });
  }

  onRowEditCancel(item: Item, index: number) {
    this.items[index] = this.clonedItems[item.itemName];
    delete this.clonedItems[item.itemName];
  }
  
}
