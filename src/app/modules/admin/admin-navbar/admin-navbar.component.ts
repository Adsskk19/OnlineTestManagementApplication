import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { JwtService } from 'src/app/services/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private feedbackService: FeedbackService
  ) {}

  userName = this.jwtService.getUser();
  feebackList: any;
  notifications: any=[];
  notificationCountDisplay: string = '';

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe((response:any[]) => {
      this.feebackList = response.reverse();
      this.updateNotificationsCount();
    });
  }

  updateNotificationsCount(){
    this.notifications = this.feebackList.filter((item: any) => !item.seenStatus);
    const count = this.notifications.length;
    if (count > 99) {
      this.notificationCountDisplay = '99+';
    } else if (count > 9) {
      this.notificationCountDisplay = '9+';
    } else {
      this.notificationCountDisplay = count.toString();
    }
  }

  logout() {
    Swal.fire({
      icon: 'success',
      text: 'Logged out Successfully as ADMIN',
      width: '18rem',
      padding: '1rem',
    }).then((result) => {
      localStorage.clear();
      location.reload();
    });
  }

  closeModal() {
    this.feedbackService.updateSeenStatus().subscribe((response:any[]) => {
      console.log("res",response);
      this.feebackList = response.reverse();
      this.updateNotificationsCount();
    });
  }
}
