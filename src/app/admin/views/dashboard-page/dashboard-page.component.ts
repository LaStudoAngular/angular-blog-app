import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'bl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private unsubscribe = new Subscription();
  public searchString = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.unsubscribe = this.postService
      .getAllPosts()
      .subscribe((posts: Post[]) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  onRemovePost(event: MouseEvent, post: Post) {
    event.preventDefault();
    console.log(`remove post`, post);
  }

  onShowDetails(post: Post) {
    this.router.navigate(['admin', 'post', post.id, 'edit']);
  }
}
