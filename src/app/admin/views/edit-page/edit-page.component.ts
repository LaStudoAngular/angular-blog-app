import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'bl-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  public post: Post;
  public editForm: FormGroup;
  private updateSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  onSubmit() {
    if (this.editForm.valid) {
      const { title, body } = this.editForm.value;
      const editPost: Post = {
        ...this.post,
        title,
        body,
      };
      this.updateSub = this.postService.updatePost(editPost).subscribe(() => {
        this.alertService.warning('Post was edited');
        this.editForm.reset();
        this.router.navigate(['admin', 'dashboard']);
      });
    }
  }

  ngOnInit(): void {
    // GET ID OF CURRENT POST FROM ROUTE
    this.route.params
      .pipe(switchMap((params: Params) => this.postService.getSinglePost(params.id)))
      .subscribe((post: Post) => {
        // CREATE AN INTERMEDIATE VARIABLE
        this.post = post;
        // FORM
        this.editForm = this.fb.group({
          title: [post.title, Validators.required],
          body: [post.body, Validators.required],
        });
      });
  }

  get title() {
    return this.editForm.get('title');
  }

  get body() {
    return this.editForm.get('body');
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
