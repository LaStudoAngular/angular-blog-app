import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, FbCreateResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.dbURL}/posts.json`, post).pipe(
      // @ts-ignore
      map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      }),
    );
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.dbURL}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      }),
    );
  }

  editPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.dbURL}`, post);
  }

  deletePost(post: Post): Observable<void> {
    return this.http.delete<void>(`${environment.dbURL}/posts/${post.id}.json`);
  }
}
