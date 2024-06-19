import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  @ViewChild('feedbackModal') feedbackModal: ElementRef;
  questions: any = [];
  showResults: boolean = false;
  selectedOptions: any[] = [];
  percentage: any;
  quizTitle: string;
  currentQuestionIndex = 0;
  // isFeedbackFormOpen: boolean = false;
  // timerPaused: boolean = false;

  constructor(
    private queService: QuestionService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private jwtService: JwtService,
  )
  { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quizTitle = params['quizTitle'];
      this.queService.getQueByQuizTitle(this.quizTitle).subscribe((data) => {
        this.questions = data;
        this.timeLimitInSeconds = 60 * this.questions.length;
        this.remainingTime = this.timeLimitInSeconds;
        this.startTimer();
      });
    });
    if (this.feedbackModal) {
      this.feedbackModal.nativeElement.addEventListener('hidden.bs.modal', () => {
        // this.resumeTimer();
      });
    }
  }
  
  payload: any;

  submitAnswers() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to submit your answers',
      icon: 'warning',
      width: '18rem',
      padding: '1rem',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, submit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.displayResult();
      }
    });
  }

  displayResult() {
    let totalMarks: number = 0;
    const maxMarks: number = this.questions.length;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.selectedOptions[i] === this.questions[i].correctOpt) {
        totalMarks++;
      }
    }

    this.percentage = (totalMarks * 100) / maxMarks;
    console.log(this.percentage);
    Swal.fire({
      title: 'Successfully Submitted!',
      text: 'Your response has been submitted.',
      icon: 'success',
      width: '18rem',
      padding: '1rem',
    }).then((result) => {
      if (this.percentage >= 60.0) {
        Swal.fire({
          title: 'Congratulations!',
          html: `You scored ${(totalMarks * 100) / maxMarks}%`,
          iconHtml: '😃',
          width: '18rem',
          padding: '1rem',
          showCancelButton: false,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonText: 'View Scores',
          backdrop: `
        rgba(0,0,123,0.4)
        url('https://i.pinimg.com/originals/96/2f/b5/962fb5922d0e4085b2043a7b99120251.gif')
        left top      
        `,
        }).then((result) => {
          this.router.navigate(['student/scores']);
        });
      } else {
        Swal.fire({
          title: 'Better luck next time!',
          html: `You scored ${(totalMarks * 100) / maxMarks}%`,
          iconHtml: '☹️',
          width: '18rem',
          padding: '1rem',
          showCancelButton: false,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonText: 'View Scores',
        }).then((result) => {
          this.router.navigate(['/student/scores']);
        });
      }
    });

    this.payload = {
      userName: this.jwtService.getUser(),
      quizTitle: this.quizTitle,
      percentage: (totalMarks * 100) / maxMarks,
    };
    console.log(this.payload);
    this.quizService.saveScore(this.payload).subscribe((response) => {
      console.log('Score saved successfully', response);
    },
      (error) => {
        console.log('Error saving score', error);
      }
    )
  }

  handleOptionChange(event: any) {
    this.selectedOptions[this.currentQuestionIndex] = event.value;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }

  prevQuestion() {
    this.currentQuestionIndex--;
  }

  getQuestionOptions(index: number) {
    return [
      this.questions[index]?.option1,
      this.questions[index]?.option2,
      this.questions[index]?.option3,
      this.questions[index]?.option4,
    ];
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  //timer
  timeLimitInSeconds: number;
  remainingTime: number;
  timer: any;
  startTimer() {
    this.timer = setInterval(() => {
      // if(!this.timerPaused){
        this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.stopTimer();
        Swal.fire({
          title: 'Time is Up!',
          text: 'Your response has been submitted.',
          iconHtml: '⌛',
          width: '18rem',
          padding: '1rem',
        }).then((result) => {
          this.displayResult();
        });
      }
      // }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(
      remainingSeconds
    )}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  //feedback
  selectedQuestion: any;
  openFeedbackModal(question: any, index: number) {
    this.selectedQuestion = question;
    this.currentQuestionIndex = index;
    // this.isFeedbackFormOpen = true;
    // this.pauseTimer();
  }

  // pauseTimer() {
  //   this.timerPaused = true;
  // }

  // handleFeedbackSubmitted() {
  //   this.isFeedbackFormOpen = false;
  //   this.resumeTimer();
  // }

  // resumeTimer() {
  //   this.timerPaused = false;
  // }
}