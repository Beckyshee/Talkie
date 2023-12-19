import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AllpostsService {
  constructor(private http: HttpClient) {}

  fetchAllPost(): Observable<any> {
    return this.http.get<any>('http://localhost:5400/post/fetchAllPosts');
  }
}
