import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AdminPostService } from '../../../services/admin-post.service';
import { RichTextEditor } from '../../../../../shared/components/rich-text-editor/rich-text-editor';
import { ImageUploader, ImageUploadFn, ImageDeleteFn } from '../../../../../shared/components/image-uploader/image-uploader';
import { CreatePostDto } from '../../../../../core/models/post.model';

@Component({
  selector: 'app-post-editor',
  imports: [ReactiveFormsModule, RouterLink, RichTextEditor, ImageUploader],
  templateUrl: './post-editor.html',
})
export class PostEditor implements OnInit {
  private fb = inject(FormBuilder);
  private adminPostService = inject(AdminPostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  postForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    content: ['', Validators.required],
    image: [''],
    category: ['', Validators.required],
    tagsString: ['', Validators.required],
    author: ['', Validators.required],
    featured: [false],
  });

  isSaving = signal(false);
  errorMessage = signal('');
  isEditMode = signal(false);
  postId = signal<string | null>(null);

  uploadImage: ImageUploadFn = (file: File) => this.adminPostService.uploadImage(file);
  deleteImage: ImageDeleteFn = (url: string) => this.adminPostService.deleteImage(url);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.postId.set(id);
      this.loadPost(id);
    }
  }

  loadPost(id: string): void {
    this.adminPostService.getById(id).subscribe({
      next: (response) => {
        const post = response.data;
        this.postForm.patchValue({
          title: post.title,
          description: post.description,
          content: post.content || '',
          image: post.image,
          category: post.category,
          tagsString: post.tags.join(', '),
          author: post.author,
          featured: post.featured || false,
        });
      },
      error: (error) => {
        console.error('Failed to load post:', error);
        this.errorMessage.set('Failed to load post');
      },
    });
  }

  onImageChange(url: string): void {
    this.postForm.patchValue({ image: url });
  }

  onContentChange(content: string): void {
    this.postForm.patchValue({ content });
  }

  onSubmit(status: 'draft' | 'published'): void {
    if (this.postForm.invalid) {
      Object.keys(this.postForm.controls).forEach((key) => {
        this.postForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    const formValue = this.postForm.getRawValue();
    const postData: CreatePostDto = {
      title: formValue.title,
      description: formValue.description,
      content: formValue.content,
      image: formValue.image,
      category: formValue.category,
      tags: formValue.tagsString.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      author: formValue.author,
      featured: formValue.featured,
      status,
    };

    const request = this.isEditMode()
      ? this.adminPostService.update(this.postId()!, postData)
      : this.adminPostService.create(postData);

    request.subscribe({
      next: () => {
        void this.router.navigate(['/admin/posts']);
      },
      error: (error) => {
        console.error('Failed to save post:', error);
        this.errorMessage.set(error.error?.message || 'Failed to save post. Please try again.');
        this.isSaving.set(false);
      },
    });
  }
}
