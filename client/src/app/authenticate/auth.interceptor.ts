import {
    HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, catchError } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthSvc: UserAuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }  

      const token = this.userAuthSvc.getToken();
    //   req = this.addToken(req, token);
      return next.handle(req).pipe(
        catchError(
            (err: HttpErrorResponse) => {
                console.info(err.status);
                if(err.status === 401) {
                    this.router.navigate(['/login'])
                } else if(err.status === 403) {
                    console.info(err)
                    this.router.navigate(['/forbidden'])
                }
                return throwError("Some thing is wrong")
            }
        )
      );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
}


// with this code  how to i retrieve from api, set and then check catchError



// If there is no token in userAuthSvc, you can make a backend API call to retrieve a new token by providing username and password, 
// then set it as the authorization header for subsequent requests. You can modify your addToken method to call the API if there is no token stored, like this:

// private addToken(req: HttpRequest<any>, token?: string) {
//   if (!token) {
//     // make a call to your API to get a new token
//     const credentials = { 
//       userName: 'your_user_name',
//       password: 'your_password'
//     };
//     this.authService.login(credentials)
//       .subscribe((res: any) => {
//         // store the new token in userAuthSvc
//         this.userAuthSvc.setToken(res.token);
//         // repeat the original request with the new token
//         req = req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${res.token}`
//           }
//         });
//         return next.handle(req);
//       }, (err) => {
//         console.error(err);
//         this.router.navigate(['/login']);
//       });
//   } else {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next.handle(req);
//   }
// }

// Then you can modify the beginning of the intercept method to make use of the modified addToken function, like this:

// intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
// ): Observable<HttpEvent<any>> {
//   if (req.headers.get('No-Auth') === 'True') {
//     return next.handle(req.clone());
//   } 
//   const token = this.userAuthSvc.getToken();
//   return this.addToken(req, token).pipe(
//     catchError((err: HttpErrorResponse) => {
//       console.info(err.status);
//       if(err.status === 401) {
//           this.router.navigate(['/login'])
//       } else if(err.status === 403) {
//           console.info(err)
//           this.router.navigate(['/forbidden'])
//       }
//       return throwError("Something is wrong")
//     })
//   );
// }

// This way, if there is no token available, it will make a call to your AuthService's login method and pass it the user's credentials to obtain a new token. If successful, it stores the new token using the UserAuthService's setToken method and sets the header of the original request to include the new token. If not successful, it redirects to the login page. Finally, it returns the new request with the updated headers.