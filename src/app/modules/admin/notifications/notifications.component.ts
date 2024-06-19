import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  @Input() feedbackList: any[]=[];
  constructor(private feedbackService: FeedbackService) {}
  ngOnInit(): void {
  }

  getInitials(name: string): string {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
  
}
