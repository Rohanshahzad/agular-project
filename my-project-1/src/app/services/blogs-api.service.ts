import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { arrayCards } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class BlogsApiService {
  url = 'http://localhost:3000/blogs'
  constructor(private http: HttpClient) { }
  getBlogs() :Observable<arrayCards[]> {
    return this.http.get<arrayCards[]>(this.url);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  patch(id: number, file: any) {
    return this.http.patch<arrayCards[]>(`${this.url}/${id}`, file)
  }
  public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public loader$: Observable<boolean> = this.loader.asObservable();
  showLoader(){
    this.loader.next(true)
  }
  hideLoader(){
    this.loader.next(false)
  }
}
