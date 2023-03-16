
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '../model/authResponse';
import { Credential } from '../model/credentials';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  credential!: Credential;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSvc: UserService,
    private userAuthSvc: UserAuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.createCredential();
  }
  
  submit() {
    this.credential = this.form.value as Credential;
    this.userSvc.login(this.credential).subscribe(
      (response: AuthResponse) => {
      this.userAuthSvc.setRole(response.user.role);
      this.userAuthSvc.setToken(response.jwtToken);
      const role = this.userAuthSvc.getRoles();
      if (role[0].role === 'Admin') {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/user');
      }
    },
    (error) => {
      console.info(error);
    }
    );
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