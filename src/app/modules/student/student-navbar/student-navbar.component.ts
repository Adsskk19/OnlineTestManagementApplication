import { Component } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent {
  constructor(private jwtService: JwtService) { }
  userName = this.jwtService.getUser();
  logout() {
    Swal.fire({
      icon: 'success',
      text: 'Logged out Successfully as USER',
      width: '18rem',
      padding: '1rem'
    }).then((result) => {
      localStorage.clear();
      location.reload();
    })
  }
}
