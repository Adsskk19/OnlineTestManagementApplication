import { Component, HostListener } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  constructor(private jwtService: JwtService) { }
  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    history.forward();
  }
  userName = this.jwtService.getUser();
}
