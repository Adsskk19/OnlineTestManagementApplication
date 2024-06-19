import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginnavbar',
  templateUrl: './loginnavbar.component.html',
  styleUrls: ['./loginnavbar.component.css']
})
export class LoginnavbarComponent {
  constructor(private router: Router) { }
  login() {
    this.redirect("")
  }
  redirect(redirect: any) {
    this.router.navigate([redirect])
  }
}
