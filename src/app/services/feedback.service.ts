import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:7002/feedback';

  constructor(private http: HttpClient) {}

  giveFeedback(feedbackData:any) {
    return this.http.post(`${this.apiUrl}/giveFeedback`,feedbackData);
  }

  getFeedback(){
    return this.http.get(`${this.apiUrl}`)
  }

  updateSeenStatus(){
    return this.http.get(`${this.apiUrl}/updateSeenStatus`);
  }
}
