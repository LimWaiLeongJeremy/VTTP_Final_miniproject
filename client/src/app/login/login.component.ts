import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credential } from '../model/credentials';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  credential!: Credential;

  constructor(private fb: FormBuilder, private userSvc: UserService) {}

  ngOnInit(): void {
    this.form = this.createCredential();
  }

  submit() {
    this.credential = this.form.value as Credential;
    console.info('>>> form: ', this.credential);
    this.userSvc.login(this.credential).subscribe(
      (response) => {
        console.info(response);
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
