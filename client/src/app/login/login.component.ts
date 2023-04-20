import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
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
// TODO: login with diffrent user might not route to user page
  ngOnInit(): void {
    this.form = this.createCredential();
  }

  async submit() {
    this.credential = this.form.value as Credential;

    this.sub = this.userSvc.login(this.credential).subscribe(
      (response: AuthResponse) => {
        const username = response.user.firstName + ' ' + response.user.lastName;
        sessionStorage.clear();
        this.userAuthSvc.setUserName(username);
        this.userAuthSvc.setRole(response.user.role);
        this.userAuthSvc.setToken(response.jwtToken);
        localStorage.clear();
        localStorage.setItem('token', response.jwtToken);
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

  get userName() { return this.form.get('userName'); }
  get password() { return this.form.get('password'); }
}