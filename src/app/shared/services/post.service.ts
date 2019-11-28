import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
const URL = ``;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(URL, post);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(URL);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.post<Post>(URL, post);
  }
}
