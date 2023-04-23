import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthResponse } from '../model/authResponse';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  Observable,
  throwError,
  catchError,
  switchMap,
  from,
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token = this.userAuthSvc.getToken() || '';
  constructor(
    private userAuthSvc: UserAuthService,
    private router: Router,
    private userSvc: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log(req);
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthSvc.getToken() || '';

    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.info('login with error: ' + err.message);
          this.userAuthSvc.clear();
          this.router.navigate(['/login']);
          return throwError('Unauthorized');
        } else if (err.status === 403) {
          console.info(err);
          this.router.navigate(['/forbidden']);
          return throwError('Access Denied');
        } else {
          console.log(err);
          return throwError(err.error);
        }
      })
    );
  }

  private addToken(
    req: HttpRequest<any>,
    next: HttpHandler,
    token?: string
  ): Observable<HttpEvent<any>> {
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(authReq);
    }

    const credential = {
      userName: req.body.userName,
      password: req.body.password,
    };

    return from(this.userSvc.login(credential)).pipe(
      switchMap((authResponse: AuthResponse) => {
        if(authResponse.jwtToken){
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${authResponse.jwtToken}`,
            },
          });
          return next.handle(authReq);
        }else{
          console.error('Not authenticated');
          this.router.navigate(['/login']);
          return  next.handle(req);
        }
      
      }),
      catchError((err) => {
        console.error(err);
        this.router.navigate(['/login']);
        return throwError(err);
      })
    );
  }
}
