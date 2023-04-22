import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './service/user-auth.service';
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor( private userAuthSvc: UserAuthService, private updates: SwUpdate) {
    if (updates.isEnabled) {
      updates.versionUpdates.subscribe(event => {
        updates.activateUpdate().then(() => window.location.reload());
      })
    }
  }
  ngOnInit(): void {
    window.onbeforeunload = () => {
      if (this.userAuthSvc.authenticated()) {
        this.userAuthSvc.clear
      }
    }
  }

  headerViewCartClicked(event: any){
    console.log("appcomp clicked", event)
  }
}
