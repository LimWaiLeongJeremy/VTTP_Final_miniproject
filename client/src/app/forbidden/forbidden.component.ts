import { Component } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css'],
})
export class ForbiddenComponent {
  
  constructor( private userAuthSvc: UserAuthService, private router: Router ) { }

  public logout() {
    this.userAuthSvc.clear()
    this.router.navigateByUrl("/home")
  }
}
