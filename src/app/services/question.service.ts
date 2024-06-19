import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8082/question';

  constructor(private http: HttpClient) {}

  getAllQuestion() {
    return this.http.get(this.apiUrl);
  }

  getQueByQuizTitle(quizTitle:String) {
    return this.http.get(`${this.apiUrl}/quiz/${quizTitle}`);
  }

  addQuestion(que:any){
    return this.http.post(`${this.apiUrl}/createque`,que);
  }

  deleteQuestion(queId:String) {
    return this.http.delete(`${this.apiUrl}/deleteque/${queId}`);
  }
}
