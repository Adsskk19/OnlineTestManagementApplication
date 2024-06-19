import { Component, HostListener } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {
  constructor(private jwtService: JwtService) { }
  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    history.forward();
  }
  userName = this.jwtService.getUser();
}
