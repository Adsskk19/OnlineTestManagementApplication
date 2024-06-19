import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { JwtService } from 'src/app/services/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  @Input() question = {
    correctOpt: '',
    option1: '',
    option2: '',
    option3: ' ',
    option4: ' ',
    que: '',
    queId: '',
    quizTitle: '',
  };
  @Input() index: number;
  // @Output() feedbackSubmitted = new EventEmitter<void>();
  feedback: any = {};
  feedbackForm: any;
  class: any;

  constructor(
    private feedbackService: FeedbackService,
    private jwtService: JwtService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
  }

  payload: any;
  submitFeedback() {
    console.log(this.feedback.feedbackText);
    let dateString = new Date();
    let dateObject = new Date(dateString);
    let formattedDate = this.datePipe.transform(dateObject, 'dd/MM/yyyy');
    this.payload = {
      userName: this.jwtService.getUser(),
      quizTitle: this.question.quizTitle,
      queId: this.question.queId,
      queNo: `Question ${this.index + 1}`,
      studentFeedback: this.feedback.feedbackText,
      feedbackDate: formattedDate,
      seenStatus: false,
    };

    console.log(this.payload);
    this.feedbackService.giveFeedback(this.payload).subscribe((response) => {
      Swal.fire({
        title: 'Feedback Submitted Successfully!',
        icon: 'success',
        width: '18rem',
        padding: '1rem',
      }).then(() => {
        // this.feedbackSubmitted.emit();
      });
    });
  }
}
