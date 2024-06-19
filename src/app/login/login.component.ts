import { Component } from '@angular/core';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    username: '',
    password: ''
  };

  usernameError: string = null;
  passwordError: string = null;

  validateUsername(): void {
    this.usernameError = this.loginForm.username && /^[a-zA-Z0-9_@]{1,}$/.test(this.loginForm.username)
      ? ''
      : 'Hint: a-zA-Z0-9_@';
  }

  validatePassword(): void {
    this.passwordError = this.loginForm.password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{4,19}$/.test(this.loginForm.password)
      ? ''
      : 'Hint:A-Za-z@#0-9';
  }

  constructor(private loginService: LoginService) { }

  onSubmit() {
    this.loginService.login(this.loginForm);
  }

  hidePassword: boolean = true;
  passwordHide(): void {
    this.hidePassword = !this.hidePassword;
  }
}
