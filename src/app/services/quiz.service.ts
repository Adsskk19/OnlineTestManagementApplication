import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../models/score';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = "http://localhost:8081/quiz";

  constructor(private http: HttpClient,
    private jwtService: JwtService) { }

  getAllQuiz() {
    return this.http.get(this.apiUrl);
  }

  addQuiz(quiz: any) {
    const responseText: Object = { responseType: 'text' };
    return this.http.post(`${this.apiUrl}/create`, quiz, responseText);
  }

  updateQuiz(quiz: any, id: string) {
    return this.http.put(`${this.apiUrl}/updateQuiz/${id}`, quiz);
  }

  deleteQuiz(queId: String) {
    return this.http.delete(`${this.apiUrl}/deleteQuiz/${queId}`);
  }

  getQuizbyTitle(quizTitle: string) {
    return this.http.get(`${this.apiUrl}/quizdata/${quizTitle}`);
  }

  saveScore(scoreData: any) {
    return this.http.post(`${this.apiUrl}/scoreBoard`, scoreData);
  }

  getAllScoresByUsername(userName: string) {
    return this.http.get(`${this.apiUrl}/getAllScores/${userName}`);
  }
}
