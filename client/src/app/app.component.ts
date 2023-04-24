import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './service/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Potter Potion!';

  constructor(private userAuthSvc: UserAuthService) {}
  ngOnInit(): void {
    window.onbeforeunload = () => {
      if (this.userAuthSvc.authenticated()) {
        this.userAuthSvc.clear;
      }
    };
  }
}
