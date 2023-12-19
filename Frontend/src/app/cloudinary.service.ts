import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryuploadService {
  constructor(private http: HttpClient) {}

  uploadImage(vals: any): Observable<any> {
    let data = vals;
    return this.http.post(
      'https://api.cloudinary.com/v1_1/dh4ehrtcu/image/upload',
      data
    );
  }
}
