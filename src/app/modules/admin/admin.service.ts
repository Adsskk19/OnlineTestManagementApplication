import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private jwt: JwtService) { }

  getProfileByUserName() {
    return this.http.get<Profile>("http://localhost:7001/byUserName/" + this.jwt.getUser())
  }

  updateAdmin(userName: string, data: any): Observable<any> {
    const url = "http://localhost:7001/updateAdmin/" + userName;
    return this.http.put(url, data);
  }

  viewAllStudents() {
    return this.http.get<Profile[]>("http://localhost:7001/viewAllStudents")
  }
}
