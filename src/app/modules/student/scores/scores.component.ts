import { Component } from '@angular/core';
import { Score } from 'src/app/models/score';
import { JwtService } from 'src/app/services/jwt.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent {
  scores: Score[] = [];

  constructor(private quizService: QuizService,
    private jwtService: JwtService) { }

  ngOnInit(): void {
    const username = this.jwtService.getUser();
    this.quizService.getAllScoresByUsername(username).subscribe(
      (res: Score[]) => {
        this.scores = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}