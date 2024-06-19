import { Injectable } from '@angular/core';
import { JwtObject } from './jwtObject';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwtToken: string;
  decodedToken: JwtObject;

  constructor(private localStorage: LocalStorageService) {
    this.setToken(localStorage.get("jwt") ? <string>localStorage.get("jwt") : null);
  }

  setToken(token: string | null) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getDecodeToken(): JwtObject {
    return jwtDecode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.sub : null;
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isStudent() {
    return this.getRole?this.getRole()==="USER":false;
  }

  isAdmin() {
    return this.getRole?this.getRole()==="ADMIN":false;
  }

  getId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.id ? this.decodedToken.id : null : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    }
    else {
      return false;
    }
  }

  getToken(): string {
    return this.jwtToken;
  }
}
