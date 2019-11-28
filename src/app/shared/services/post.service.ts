import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
const URL = ``;

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post) {
    console.log(post);
    // return this.http.post(URL, post);
  }
}
