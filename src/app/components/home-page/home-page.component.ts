import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'bl-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public posts$: Observable<Post[]>;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts$ = this.postService.getAllPosts();
  }

}
