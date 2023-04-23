import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthSvc: UserAuthService,
    private router: Router,
    private userSvc: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userAuthSvc.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;
      if (role) {
        const match = this.userSvc.roleMatch(role);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    this.userAuthSvc.clear();
    this.router.navigate(['/login']);
    return false;
  }
}