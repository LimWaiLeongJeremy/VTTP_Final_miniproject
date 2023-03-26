import { Component,HostListener,OnDestroy } from '@angular/core';
import { UserAuthService } from './service/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  constructor(private userAuthSvc: UserAuthService) {}

  // ngOnDestroy(): void {
  //   localStorage.clear();
  // }
  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: Event) {
    localStorage.clear();
  }
  // TODO: onDestroy: purge loccalstorage
}
