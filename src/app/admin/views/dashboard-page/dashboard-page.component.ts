import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/interfaces/post';

@Component({
  selector: 'bl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((posts: Post[]) => (this.posts = posts));
  }
}
