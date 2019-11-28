import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'bl-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
      author: [null, [Validators.required]],
    });
  }

  get title() {
    return this.createForm.get('title');
  }

  get body() {
    return this.createForm.get('body');
  }

  get author() {
    return this.createForm.get('author');
  }

  onSubmit(): void {
    const { title, body, author } = this.createForm.value;
    const newPost: Post = {
      title,
      body,
      author,
      date: new Date(),
    };
    this.postService.createPost(newPost).subscribe((post: Post) => console.log(post));
  }
}
