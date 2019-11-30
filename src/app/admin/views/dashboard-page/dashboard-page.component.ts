import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'bl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private getSub = new Subscription();
  private removeSub = new Subscription();
  public searchString = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getSub = this.postService.getAllPosts().subscribe((posts: Post[]) => (this.posts = posts));
  }

  onRemovePost(event: MouseEvent, post: Post) {
    event.preventDefault();
    this.removeSub = this.postService
      .deletePost(post)
      .subscribe(() => {
        this.alertService.warning('Post was deleted');
        this.posts = this.posts.filter((el: Post) => el.id !== post.id);
      });
  }

  onShowDetails(post: Post) {
    this.router.navigate(['admin', 'post', post.id, 'edit']);
  }

  ngOnDestroy(): void {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }
}
