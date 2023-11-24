import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { arrayCards } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  url = 'http://localhost:3000/user'
  url2 = 'http://localhost:3000/blogs'
  private token: any;

  constructor(private http: HttpClient) { }
  saveUsers(data: arrayCards[]) {
    return this.http.post<arrayCards[]>(this.url, data);
  }
  getUsers() {
    return this.http.get<arrayCards[]>(this.url);
  }
  upload(file: arrayCards): Observable<arrayCards[]> {
    return this.http.post<arrayCards[]>(this.url2, file)
  }
  setToken(tokenData: any) {
    this.token = tokenData;
  }
  getToken() {
    return this.token;
  }
  removeToken() {
    return this.token = ''
  }

}


