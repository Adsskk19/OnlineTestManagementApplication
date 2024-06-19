import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { JwtRespone } from './jwt-respone';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
    private jwtService: JwtService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  login(data: any) {
    this.httpClient.post<JwtRespone>("http://localhost:7001/signIn", data)
      .subscribe(
        jwtToken => {
          this.jwtService.setToken(jwtToken.accessToken);
          this.localStorageService.set('jwt', jwtToken.accessToken);
          this.localStorageService.set('role', jwtToken.roles[0]);
          if (this.jwtService.isStudent()) {
            this.router.navigate(['student/quiz']);
            Swal.fire({
              icon: 'success',
              text: 'Logged in Successfully as USER',
              width: '18rem',
              padding: '1rem'
            });
          }
          else if (this.jwtService.isAdmin()) {
            this.router.navigate(['admin/addQuiz']);
            Swal.fire({
              icon: 'success',
              text: 'Logged in Successfully as ADMIN',
              width: '18rem',
              padding: '1rem'
            });
          }
        },
        err => {
          Swal.fire({
            icon: 'error',
            text: 'Invalid Credentials',
            width: '18rem',
            padding: '1rem'
          }).then((result) => {
            window.location.reload();
          });
        }
      )
  }
}
