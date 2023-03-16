import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, catchError, switchMap, map } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Roles } from '../model/roles';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userAuthSvc: UserAuthService,
    private router: Router,
    private userSvc: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
    roles: string = ''
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthSvc.getToken() || '';
    const authResp =  this.addToken(req, next, token);
    // roles = this.userAuthSvc.getRoles();
    // // response.user.role[0].role
    // if (roles === 'Admin') {
    //   this.router.navigateByUrl('/admin');
    // } else {
    //   this.router.navigateByUrl('/user');
    // }
    return authResp.pipe(
        catchError((err: HttpErrorResponse) => {
          console.info('token', token);
          console.info(err.status);
          if (err.status === 401) {
            console.info('login with error: ' + err.message);
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            console.info(err);
            this.router.navigate(['/forbidden']);
          }
          return throwError('Something is wrong');
        })
      );
    }

  private addToken(req: HttpRequest<any>, next: HttpHandler, token?: string) {
    // check if token exsist
    if (token == '') {
      const credential = {
        userName: req.body.userName,
        password: req.body.password,
      };
      //   call auth endpoint
      this.userSvc.login(credential).subscribe((x) => {
        // set request header with Bearer {token}
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${x.jwtToken}`,
          },
        });
      }),
        //   if login fail route to /login
        catchError((err) => {
          console.error(err);
          this.router.navigate(['/login']);
          return throwError(err);
        });
      // if no error return req for auth
      return next.handle(req);
    } else {
      // if token exsist set Bearer and return req for auth
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(req);
    }
  }

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   if (req.headers.get('No-Auth') === 'True') {
  //     return next.handle(req.clone());
  //   }

  //     const token = this.userAuthSvc.getToken() ;
  //     // req = this.addToken(req, token);
  //     return next.handle(req).pipe(
  //       catchError(
  //           (err: HttpErrorResponse) => {
  //               console.info(err.status);
  //               if(err.status === 401) {
  //                   this.router.navigate(['/login'])
  //               }
  //               return throwError("Some thing is wrong")
  //           }
  //       )
  //     );
  // }

  // private addToken(req: HttpRequest<any>, token: string) {
  //   console.info(token)
  //   console.info(!token)
  //   if(token) {
  //     const credential = {
  //       userName: this.userAuthSvc.getUserName(),
  //       password: this.userAuthSvc.getPassword()
  //     };
  //     console.log(credential)
  //   }
  //   return req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
}
