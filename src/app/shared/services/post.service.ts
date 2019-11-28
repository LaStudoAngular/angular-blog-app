import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.dbURL}/posts.json`, post);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.dbURL}`);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.dbURL}`, post);
  }
}
