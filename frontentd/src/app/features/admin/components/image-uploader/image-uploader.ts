import { Component, inject, signal, output, input } from '@angular/core';
import { AdminPostService } from '../../services/admin-post.service';

@Component({
  selector: 'app-image-uploader',
  imports: [],
  templateUrl: './image-uploader.html',
})
export class ImageUploader {
  private adminPostService = inject(AdminPostService);

  initialImageUrl = input<string>('');
  imageUrlChange = output<string>();

  previewUrl = signal<string>('');
  isUploading = signal(false);
  isDragging = signal(false);
  errorMessage = signal('');

  constructor() {
    if (this.initialImageUrl()) {
      this.previewUrl.set(this.initialImageUrl());
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  uploadFile(file: File): void {
    this.errorMessage.set('');

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
      this.errorMessage.set('Please upload a valid image file (PNG, JPG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage.set('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    this.isUploading.set(true);

    this.adminPostService.uploadImage(file).subscribe({
      next: (response) => {
        this.imageUrlChange.emit(response.url);
        this.previewUrl.set(response.url);
        this.isUploading.set(false);
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.errorMessage.set('Upload failed. Please try again.');
        this.previewUrl.set('');
        this.isUploading.set(false);
      },
    });
  }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.previewUrl.set('');
    this.imageUrlChange.emit('');
  }
}
