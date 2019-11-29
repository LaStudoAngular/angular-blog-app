import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces';

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search: string): Post[] {
    return !search.trim()
      ? posts
      : posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
  }
}
