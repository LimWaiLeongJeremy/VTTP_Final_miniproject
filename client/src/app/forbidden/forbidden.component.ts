import { Component } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css'],
})
export class ForbiddenComponent {
  
  constructor( private userAuthSvc: UserAuthService ) { }

  public logout() {
    this.userAuthSvc.clear
  }
}
