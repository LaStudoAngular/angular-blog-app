import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bl-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  public post: Post;
  public editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.editForm.valid) {
      const { title, body, author } = this.editForm.value;
      const editPost: Post = {
        title,
        body,
        author,
        id: this.post.id,
        date: new Date(),
      };
      this.postService.updatePost(editPost).subscribe(() => {
        this.editForm.reset();
        this.router.navigate(['admin', 'dashboard']);
      });
    }
  }

  ngOnInit(): void {
    // GET ID OF CURRENT POST FROM ROUTE
    this.route.params.subscribe((params: Params) => {
      this.postService.getSinglePost(params.id).subscribe((post: Post) => {
        // CREATE AN INTERMEDIATE VARIABLE
        this.post = post;
        // PATCH FORM
        this.editForm.patchValue({
          title: this.post.title,
          body: this.post.body,
          author: this.post.author,
        });
      });
    });
    // INIT EDIT FORM
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  get title() {
    return this.editForm.get('title');
  }

  get body() {
    return this.editForm.get('body');
  }

  get author() {
    return this.editForm.get('author');
  }
}
