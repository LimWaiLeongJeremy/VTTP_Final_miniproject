import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, catchError, switchMap, map, firstValueFrom, from, mergeMap, of } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Roles } from '../model/roles';
import { AuthResponse } from '../model/authResponse';

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
    roles: string = ''
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthSvc.getToken() || '';

    const authResp =  this.addToken(req, next, token);
    
    console.log(authResp)
  
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.info('login with error: ' + err.message);
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

    private addToken(req: HttpRequest<any>, next: HttpHandler, token?: string): Observable<HttpEvent<any>> {
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
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${authResponse.jwtToken}`,
            },
          });
          return next.handle(authReq);
        }),
        catchError((err) => {
          console.error(err);
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
    }
  
  

//   // intercept(
//   //   req: HttpRequest<any>,
//   //   next: HttpHandler
//   // ): Observable<HttpEvent<any>> {
//   //   if (req.headers.get('No-Auth') === 'True') {
//   //     return next.handle(req.clone());
//   //   }

//   //     const token = this.userAuthSvc.getToken() ;
//   //     // req = this.addToken(req, token);
//   //     return next.handle(req).pipe(
//   //       catchError(
//   //           (err: HttpErrorResponse) => {
//   //               console.info(err.status);
//   //               if(err.status === 401) {
//   //                   this.router.navigate(['/login'])
//   //               }
//   //               return throwError("Some thing is wrong")
//   //           }
//   //       )
//   //     );
//   // }

//   // private addToken(req: HttpRequest<any>, token: string) {
//   //   console.info(token)
//   //   console.info(!token)
//   //   if(token) {
//   //     const credential = {
//   //       userName: this.userAuthSvc.getUserName(),
//   //       password: this.userAuthSvc.getPassword()
//   //     };
//   //     console.log(credential)
//   //   }
//   //   return req.clone({
//   //     setHeaders: {
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //   });
//   // }
// }
}