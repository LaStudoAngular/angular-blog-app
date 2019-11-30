import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'bl-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  public post$: Observable<Post>;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      mergeMap((params: Params) => this.postService.getSinglePost(params.id))
    );
  }
}
