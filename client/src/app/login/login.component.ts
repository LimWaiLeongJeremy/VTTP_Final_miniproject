import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom, from, lastValueFrom, Subscription } from 'rxjs';
import { AuthResponse } from '../model/authResponse';
import { Credential } from '../model/credentials';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  credential!: Credential;
  sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSvc: UserService,
    private userAuthSvc: UserAuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.createCredential();
  }

  async submit() {
    this.credential = this.form.value as Credential;

    this.sub = this.userSvc.login(this.credential).subscribe(
      (response: AuthResponse) => {
        this.userAuthSvc.setRole(response.user.role);
        this.userAuthSvc.setToken(response.jwtToken);
        this.userAuthSvc.setUserName(response.user.firstName +' ' + response.user.lastName)
        const role = this.userAuthSvc.getRoles();
        console.log('roles: ', role);
        if (role[0].role === 'Admin') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/user');
        }
      },
      (error) => {
        console.info(error);
        this.messageService.add({
          key: 'loginToast',
          severity: 'error',
          summary: 'Authentication Error',
          detail:
            'Please login with the correct credentials or create an account',
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private createCredential(): FormGroup {
    return this.fb.group({
      userName: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required),
    });
  }
}

// submit() {
//   this.userSvc.login(this.form.value as Credential).subscribe({
//     next: (response: any) => {
//       console.info(response)

//       this.userAuthSvc.setUserName(response.user.userName);
//       this.userAuthSvc.setPassword(response.user.password);
//       this.userAuthSvc.setRole(response.user.role);
//       this.userAuthSvc.setToken(response.jwtToken);
//       const roleType =response.user.role[0].role;
//       console.log(this.userAuthSvc.getToken())
//       console.log(this.userAuthSvc.getRoles())
//       this.router.navigateByUrl(roleType === 'Admin' ? '/admin' : '/user');
//     },
//     error: (err) => console.info(err),
//   });
// }
