import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Score } from 'src/app/models/score';
import { JwtService } from 'src/app/services/jwt.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quizes: any = [];
  isRetakeQuiz: boolean = false;
  timer: any;
  scores: Score[] = [];
  remainingTime: number;

  constructor(
    private quizService: QuizService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizService.getAllQuiz().subscribe((data) => {
      this.quizes = data;
      console.log(this.quizes);
    });

    const username = this.jwtService.getUser();
    this.quizService.getAllScoresByUsername(username).subscribe(
      (res: Score[]) => {
        this.scores = res;
        console.log(this.scores);
      },
      (err) => {
        console.log(err);
      }
    );

    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer() {
    this.updateRemainingTime();
    this.timer = setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
  }

  updateRemainingTime() {
    if (!this.scores || this.scores.length === 0) {
      this.remainingTime = 0;
      return;
    }

    const lastScore = this.scores.reduce((prev, current) =>
      prev.dateTaken > current.dateTaken ? prev : current
    );

    const now = new Date();
    const lastDateTaken = new Date(lastScore.dateTaken);
    const difference = lastDateTaken.getTime() + 24 * 60 * 60 * 1000 - now.getTime(); 
    this.remainingTime = Math.max(0, Math.floor(difference / 1000));
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getScore(quizTitle: string) {
    const quizScore = this.scores.find(
      (score) => score.quizTitle === quizTitle
    );
    return quizScore ? true : false;
  }

  openQuiz(quizTitle: string) {
    this.router.navigate(['student/question'], {
      queryParams: {
        quizTitle: quizTitle,
      },
    });
  }

  canRetakeQuiz(quizTitle: string): boolean {
    const lastScore = this.scores.find((score) => score.quizTitle === quizTitle);
    if (!lastScore) {
      return true;
    }

    const now = new Date();
    const lastDateTaken = new Date(lastScore.dateTaken);
    const difference = now.getTime() - lastDateTaken.getTime();

    this.remainingTime = Math.max(0, 24 * 60 * 60 - Math.floor(difference / 1000)); 

    const hoursDifference = difference / (1000 * 3600);
    return hoursDifference >= 24;
  }

  formatTime(seconds: number): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;
    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(remainingSeconds)}`;
  }

  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
}

